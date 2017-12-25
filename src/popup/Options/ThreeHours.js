import React, { Component } from 'react';
import { Button, Icon } from 'antd';

class ThreeHours extends Component {

  handleClick(){
    var now = new Date();
    now.setHours(now.getHours() + 3);
    browser.runtime.sendMessage({ op: "snooze", args: { delay: now.getTime() } });
  }

  render() {
    return (
      <Button onClick={this.handleClick} className="column-one" type="dashed" size="large" >
          For 3 Hours
        </Button>
    );
  }
}

export default ThreeHours;