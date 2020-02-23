import React, { Component }  from 'react'
import App from './App'
import Home from '@/pages/home'
import My from '@/pages/my'
import Dialog from '@/pages/dialog'

class Router extends Component {
  state = {
    tab: 0,
    isShow: false,
    dialogData: null
  }

  change (tab) {
    this.setState({ tab })
  }

  openDialog (data) {
    this.setState({ dialogData: data, isShow: true })
  }

  close () {
    this.setState({ dialogData: null, isShow: false })
  }

  render() {
    return (<App>
      <div className="app-app">
        <div className="app-body">
          {[<Home openDialog={this.openDialog.bind(this)} />, <My  openDialog={this.openDialog.bind(this)} />][this.state.tab]}
        </div>
        <div className="app-footer">
          <div onClick={this.change.bind(this, 0)} className={this.state.tab ? '' : 'active'}>首页</div>
          <div onClick={this.change.bind(this, 1)} className={this.state.tab ? 'active' : ''}>我的</div>
        </div>
      </div>
      {this.state.isShow && <Dialog data={this.state.dialogData} close={this.close.bind(this)} />}
    </App>)
  }
}

export default Router