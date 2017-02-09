import React, { Component } from 'react';
import EventRow from './event-row';
import '../styles/event-list.css';

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
        // some prefer inline styling. Here is one example.
        // Usually when styling is state-dependent. (Not the case here)
        this.styles = {
            table: {
                borderCollapse: 'separate',
                borderSpacing: 0,
                color: '#404040',
                fontSize: '12px',
                margin: '0 auto'
            }
        };
        this.subscription = props.sysdigManager.eventsReceived.subscribe(this._refreshList);
        this.fields = props.sysdigManager.fields;
    }

    componentWillUnmount() {
        if (this.subscription)
            this.subscription.dispose();
    }

    render() {
        return (
            <table style={this.styles.table}>
                <thead>
                    <tr>
                        {Object.keys(this.fields).map((tHeader, i) => <th key={i}>{tHeader}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.events.map((event, eKey) => (
                        <EventRow 
                            key={eKey} 
                            count={eKey + 1}
                            data={event}
                            fields={this.fields} />
                    ))}
                </tbody>
            </table>
        );
    }

    _refreshList = (events) => {
        this.setState({events});
    }
}

export default EventList;