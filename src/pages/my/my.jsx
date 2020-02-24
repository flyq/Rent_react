import React from 'react'
import Component from '@/Component'
import styles from './my.scss'
import classs from 'classnames'

import { getLocalStorage } from 'storeUtil'

class Home extends Component {
  state = {
    data: [{
        id: 4,
        status: 1, // 暂停出租，出租中，可以出租
        pic: 20,
        num: '1',
        img: '/41.jpg',
        imgs: ['/41.jpg', '43.jpg', '42.jpg'],
        name: '单独工位,有千兆无线网',
        time: '2020-02-25 22:00:00',
    }]
  }



  openDialog (data) {
    this.props.openDialog(data)
  }

  componentDidMount() {
    const datas = JSON.parse(getLocalStorage('data'))
    if (datas) {
      const data = this.state.data
      data.push(datas)
      this.setState({
        data
      })
    }
  }

  render() {
    return (
      <div className={styles.home}>
        {this.state.data.map(item => (
          <div className={styles.item} key={item.id} onClick={this.openDialog.bind(this, item)}>
            <img src={item.img} alt=""/>
            <div className={styles.status}>到期时间: {item.time}</div>
            <p className={styles.name}>{item.name}</p>
            <div className={styles.pic}>
              <span>人数：</span><b>{item.num}</b>
              <span>每小时价格</span><b>{item.pic}积分</b>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Home
