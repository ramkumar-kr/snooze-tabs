import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import moment from 'moment';

class NextWeek extends Component {
  handleClick() {
    var monday = new Date(Date.now());
    monday.setDate(monday.getDate() + ((7 - monday.getDay()) % 7 + 1));
    monday.setHours(9,0,0);
    browser.runtime.sendMessage({ op: "snooze", args: { delay: monday.getTime() } });
  }

  render() {
    return (
      <Button onClick={this.handleClick} className="column-two" type="dashed" size="large" >
        Next Monday
      </Button>
    );
  }
}

export default NextWeek;
