import React from 'react'
import Component from '@/Component'
import styles from './dialog.scss'

import {
  transaction,
  rentContract,
} from '../../rent'

import cita from '../../cita-sdk'


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
        <div onClick={this.buy.bind(this)} className={styles.btn}>支付 {`${this.state.pic}` !== 'NaN' ? this.state.pic : '--'}积分 租凭</div>
      </div>}
    </div>)
  }
}

export default Dialog