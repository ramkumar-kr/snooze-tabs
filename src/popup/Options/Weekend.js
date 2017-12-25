import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import moment from 'moment';

class Weekend extends Component {

  handleClick() {
    var weekend = new Date();
    var away = 6 - weekend.getDay();
    if(weekend.getDay() == 6){
      away += 1;
    }
    weekend.setDate(weekend.getDate() + away);
    weekend.setHours(9,0,0);
    browser.runtime.sendMessage({ op: "snooze", args: { delay: weekend.getTime() } });
  }

  render() {
    return (
      <Button onClick={this.handleClick} className="column-one" type="dashed" size="large" >
        Till the Weekend
      </Button>
    );
  }
}

export default Weekend;