import React, { Component } from 'react';
import Item from './Item';
import '../popup/App.css'
import { Button } from 'antd';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = { alarms: [] }
  }

  componentDidMount(){
    browser.storage.local.get().then((items) => { this.setState({alarms: items.alarms}) });
  }
  

  renderItems(){
    if(this.state.alarms.length == 0){
      return(<h1 className="two-column"> There are no snoozed tabs</h1>);
    }
    else{
      return (this.state.alarms.map((element) => {
        return (<Item element={element} key={element.url} />)
      }));
    }
  }

  refreshWindow(){
    window.location.reload();
  }

  render() {
    return (
      <div className="grid">
        {this.renderItems()}
        <Button className="two-column" size="large" onClick={this.refreshWindow}> Refresh</Button>
      </div>
    );
  }
}

export default ListView;