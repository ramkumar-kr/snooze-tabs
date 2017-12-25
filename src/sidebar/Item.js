import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../popup/App.css'
import { Card, Button, Icon, Tag } from 'antd';
const { Meta } = Card;

class Item extends Component {
  constructor(props) {
    super(props);
    this.clearAlarm = this.clearAlarm.bind(this);
    this.description = this.description.bind(this);
  }


  clearAlarm(){
    browser.runtime.sendMessage({ op: "clearAlarm", args: this.props.element.url });
    window.location.reload();
  }

  showTags(value, color){
    if(this.props.element[value] == true){
      return(<Tag color={color}>{value}</Tag>)
    }
  }


  description(){
    return(
      <div>
        <b>{this.props.element.url}</b>
        <br/>
        {this.showTags("pinned", "orange")}
        {this.showTags("incognito", "purple")}
      </div>
    );
  }
  render() {
    var delay = new Date(parseInt(this.props.element.delay));
    return (
      <div className="two-column">
        <Card actions={[<Button size="large" type="primary" href={this.props.element.url} target="_blank" >Open</Button>,
        <Button onClick={this.clearAlarm} size="large" type="danger">Delete</Button>] }>
          <Meta
            description={this.description()}
            title={(delay.toDateString() + ", " + delay.toLocaleTimeString())}/>
        </Card>
      </div>
    );
  }
}

Item.propTypes = {
  element: PropTypes.object.isRequired
};

export default Item;
