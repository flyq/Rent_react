import React from 'react'
import Component from '@/Component'
import styles from './dialog.scss'

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
  }

  change (e) {
    this.setState({ time: e.target.value, pic: this.props.data.pic * e.target.value })
  }

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
//        window.cyton.getAccount() 

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
                this.props.history.push('/');
            }
          })
        } else {
            alert("Transaction send failed")
            this.props.history.push('/');
        }
      })
  }
  render() {
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
      {this.props.data.time ? <div className={styles.time}>
        本办公室在{this.props.data.time}到期
      </div> : <div className={styles.footer}>
        <input value={this.state.time} placeholder="请输入时长/单位小时" onChange={this.change.bind(this)} />
        <div onClick={this.handleSubmit} className={styles.btn}>支付 {`${this.state.pic}` !== 'NaN' ? this.state.pic : '--'}积分 租凭</div>
      </div>}
    </div>)
  }
}

export default Dialog