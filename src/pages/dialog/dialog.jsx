import React from 'react'
import Component from '@/Component'
import styles from './dialog.scss'
import { setLocalStorage } from 'storeUtil'


import {
  transaction,
  rentContract,
} from '../../rent'

import cita from '../../cita-sdk'

const {
  REACT_APP_RUNTIME
} = process.env

const submitTexts = {
  normal: '愿此刻永恒',
  submitting: '保存中',
  submitted: '保存成功',
}

class Dialog extends Component {
  state = {
    time: '',
    pic: '--',
    imgs: ['/1.jpg', '2.jpg', '3.jpg'],
    isShow: false,
    data: this.props.data
  }

  change (e) {
    this.setState({ time: e.target.value, pic: this.props.data.pic * e.target.value })
  }

  getTime () {
    var now = new Date(Date.now() + this.state.time *60*60*1000);
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth() + 1;//得到月份
    var date = now.getDate();//得到日期
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds()

    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    hour = hour < 10 ? '0' + hour : hour
    minu = minu < 10 ? '0' + minu : minu
    sec = sec < 10 ? '0' + sec : sec
    return `${year}-${month}-${date} ${hour}:${minu}:${sec}`
  }
/*
交易已发送，请耐心等待区块打包
*/
  buy () {
    cita.base.getBlockNumber().then(
      current => {
        const tx = {
          ...transaction,
          validUntilBlock: +current + 88,
        }
        tx.from = window.cyton.getAccount();
      },
      rentContract.methods.rent(1,43200).send(tx),
    )
  }
  handleSubmit = e => {
    setTimeout(() => {
      this.setState({ isShow: true }, () => {
        setTimeout(() => {
          this.setState({ isShow: false })
          this.props.data.time = this.getTime()
          setLocalStorage('data', JSON.stringify(this.props.data))
          this.setState({ data: this.props.data })
        }, 3000)
      })
    }, 1000)
    const {
      time,
      pic
    } = this.state
    cita.base
      .getBlockNumber()
      .then(current => {
        const tx = {
          ...transaction,
          validUntilBlock: +current + 88,
        }
        tx.from =

            //       REACT_APP_RUNTIME === 'web' ?
        cita.base.accounts.wallet[0].address 
            //      REACT_APP_RUNTIME === 'cita-web-debugger' ?
            //      cita.base.defaultAccount :
            //    REACT_APP_RUNTIME === 'cyton' ?
          //      window.cyton.getAccount() 
        tx.value = this.state.pic

        this.setState({
          submitText: submitTexts.submitting,
        })
        return rentContract.methods.rent(1, 43200).send(tx)
      })
      .then(res => {
        if (res.hash) {
          return cita.listeners.listenToTransactionReceipt(res.hash).then(receipt => {
            if (!receipt.errorMessage) {
              this.setState({
                submitText: submitTexts.submitted
              })
            } else {
                alert(receipt.errorMessage)
                // this.props.history.push('/');
                this.props.close()
            }
          })
        } else {
            alert("Transaction send failed")
            // this.props.history.push('/');
            this.props.close()
        }
      })
  }
  render() {
    console.log(this.getTime())
    return (<div className={styles.dialog}>
        <div className={styles.close}>
            <div onClick={this.props.close}>关闭</div>
        </div>
        <h1>{this.props.data.name}</h1>
      <div className={styles.body}>
        {this.props.data.imgs.map(item => <div key={item} className={styles.img}>
            <img src={item} />
        </div>)}
      </div>
      {this.state.data.time ? <div className={styles.time}>
        本办公室在{this.state.data.time}到期
      </div> : <div className={styles.footer}>
        <input value={this.state.time} placeholder="请输入时长/单位小时" onChange={this.change.bind(this)} />
        <div onClick={this.handleSubmit} className={styles.btn}>支付 {`${this.state.pic}` !== 'NaN' ? this.state.pic : '--'}积分 租赁</div>
      </div>}
      {this.state.isShow && <div className={styles.toast}>交易已发送,请等待区块打包</div>}
    </div>)
  }
}

export default Dialog