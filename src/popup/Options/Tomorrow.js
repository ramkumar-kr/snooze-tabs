import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import moment from 'moment';

class Tomorrow extends Component {

  handleClick() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +1);
    tomorrow.setHours(9, 0, 0);
    browser.runtime.sendMessage({ op: "snooze", args: { delay: tomorrow.getTime() } });
  }

  render() {
    return (
      <Button onClick={this.handleClick} className="column-two" type="dashed" size="large" >
        9 AM Tomorrow
      </Button>
    );
  }
}

export default Tomorrow;