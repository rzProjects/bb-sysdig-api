import React, { Component } from 'react';
import '../styles/refresh-button.css';

class RefreshButton extends Component {
    render() {
        return (
            <button onClick={this._refreshList}>Refresh List</button>
        );
    }

    _refreshList = () => {
        this.props.sysdigManager.getList();
    }
}

export default RefreshButton;