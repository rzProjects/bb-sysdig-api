import React, { Component } from 'react';
import SysdigManager from './utils/sysdig-manager';
import EventList from './components/event-list';
import RefreshButton from './components/refresh-button';

class App extends Component {
    constructor() {
        super();
        this.sysdigManager = new SysdigManager();
        this._init();
    }

    render() {
        return (
            <div>
                <RefreshButton sysdigManager={this.sysdigManager} />
                <EventList sysdigManager={this.sysdigManager} />
            </div>
        );
    }

    _init = () => {
            this.sysdigManager.getList();
    }
}

export default App;
