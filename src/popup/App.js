import React, { Component } from 'react';
import { Button } from 'antd';
import CustomTime from './Options/CustomTime';
import ThreeHours from './Options/ThreeHours';
import Tomorrow from './Options/Tomorrow';
import Weekend from './Options/Weekend';
import NextWeek from './Options/NextWeek';
import './App.css';

class App extends Component {
  openSidebar(){
    browser.sidebarAction.open();
  }

  render() {
    return (
      <div className="grid">
        <h1 className="two-column">Snooze tab</h1>
          <ThreeHours />
          <Tomorrow />
          <Weekend />
          <NextWeek/>
          <CustomTime />
          <Button className="two-column" onClick={this.openSidebar} type="" size="large"> Manage Snoozed tabs </Button>
      </div>
    );
  }
}

export default App;
