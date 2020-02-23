import React from 'react'
import Component from '@/Component'
import styles from './my.scss'
import classs from 'classnames'

class Home extends Component {
  state = {
    data: [{
        id: 1, // id
        status: 1, // 暂停出租，出租中，可以出租   // 这个页面的都可以点击详情，因为是我自己租的，这个页面的状态都是 出租中
        pic: 20, // 一小时多少积分
        num: '20-40', // 容纳多少人
        img: '/1.jpg', // 封面图片
        imgs: ['/1.jpg', '2.jpg', '3.jpg'], // 详情图片
        name: '开放型会议室,提供投影和音响和40个座椅', // 名字
        time: '2020-02-25 20:00:00', // 结束时间
    }, {
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
