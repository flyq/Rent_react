import React from 'react'
import Component from '@/Component'
import styles from './home.scss'
import classs from 'classnames'
import { removeLocalStorage } from 'storeUtil'

class Home extends Component {
  state = {
    data: [{
      id: 1, // id 
      status: 2, // 0 暂停出租， 1 出租中， 2 可以出租  。 只有可以出租才可以点击进入详情
      pic: 10, // 每小时多少积分
      num: '20-40', // 容纳多少人
      img: '/1.jpg', // 封面图片
      imgs: ['/1.jpg', '2.jpg', '3.jpg'], // 详情图片
      name: '开放型会议室,提供投影和音响和40个座椅' // 名字
    }, {
      id: 3,
      status: 1, // 暂停出租，出租中，可以出租
      pic: 20,
      num: '8-10',
      img: '/31.jpg',
      imgs: ['/31.jpg'],
      name: '中型圆桌会议室,可容纳最多10人'
    }, {
      id: 4,
      status: 2, // 暂停出租，出租中，可以出租
      pic: 20,
      num: '1',
      img: '/41.jpg',
      imgs: ['/41.jpg', '43.jpg', '42.jpg'],
      name: '单独工位,有千兆无线网'
    }, {
      id: 2,
      status: 2, // 暂停出租，出租中，可以出租
      pic: 0,
      num: '2-6',
      img: '/21.jpg',
      imgs: ['/21.jpg', '23.jpg'],
      name: '茶饮,提供冰箱热水器厨灶等'
    }]
  }

  componentDidMount () {
    removeLocalStorage('data')
  }
  
  openDialog (data) {
    if (data.status === 2) {
      this.props.openDialog(data)
    }
  }

  render() {
    return (
      <div className={styles.home}>
        <h1>办公空间解决方案</h1>
        <p className={styles.title}>无论是知名企业还是成长中的初创公司，您的办公空间都应促进您的业务向前发展。找到适合您的办公空间。</p>
        {this.state.data.map(item => (
          <div className={styles.item} key={item.id} onClick={this.openDialog.bind(this, item)}>
            <img src={item.img} alt=""/>
            <div className={styles.status}>{['暂停出租', '出租中', '可以出租'][item.status]}</div>
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
