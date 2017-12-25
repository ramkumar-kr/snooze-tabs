import React, { Component } from 'react';
import { InputNumber, Select, Button, Form, Collapse } from 'antd';
const Panel = Collapse.Panel;
const Option = Select.Option;

class CustomTime extends Component {
  constructor(props) {
    super(props);
    this.createAlarm = this.createAlarm.bind(this);
  }

  createAlarm(e){
    var number = document.getElementById("number").value;
    var unit = document.getElementById("unit").value;
    var date = new Date(Date.now());
    var delay =  number * unit;
    date.setMinutes(date.getMinutes() + delay);
    console.log(date.toLocaleString() , " ============= " ,delay);
    browser.runtime.sendMessage({ op: "snooze", args: { delay: date.getTime() } });
  }

  render() {
    return (
      <div className="two-column dash-bordered">

            <Form layout="inline">
              <Form.Item required={true}>
            <input type="number" id="number" defaultValue="3" required/>
              </Form.Item>
              <Form.Item required={true}>
                <select id="unit" defaultValue="60" className="form-select select-lg" required>
                  <option value={1}> Minutes</option>
                  <option value={60}>Hours</option>
                  <option value={1440}> Days</option>
                  <option value={10080}> Weeks</option>
                </select>
              </Form.Item>
              <Button type="primary" onClick={this.createAlarm} htmlType="submit">Snooze</Button>
            </Form>

      </div>
    );
  }
}

export default CustomTime;


/**
 * <Select defaultValue="60" style={{ width: 120 }}>
                  <Option value="1">Minutes</Option>
                  <Option value="60">Hours</Option>
                  <Option value="1440">Days</Option>
                  <Option value="10080">Weeks</Option>
                </Select>
 */
