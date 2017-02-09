import React, { Component } from 'react';
import Moment from 'moment';

class EventRow extends Component {
    render() {
        return (
            <tr>
                {Object.keys(this.props.fields).map((field, i) => {
                    let value = this._getValueForHeader(field);
                    return <td title={value} key={i}>{value}</td>
                })}
            </tr>
        );
    }

    _getValueForHeader = (field) => {
        let fields = this.props.fields;
        switch(field) {
            case fields.row:
                return this.props.count;
            case fields.createdOn:
            case fields.timestamp:
                return Moment(this.props.data[field]).format('MMMM Do, YYYY');
            case fields.tags:
                 return JSON.stringify(this.props.data[field]);
            default:
                return this.props.data[field];
        }
    }
}

export default EventRow;