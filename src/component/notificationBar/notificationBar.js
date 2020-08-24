import React, { Component } from 'react';
import './notification.css'

class NotificationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{flex: "1"}}>
                <header>
                    <ul id="navbar">
                        <li className="navbar-items"> <div className="notification-bar">Total products in invetory: <span>{this.props.total}</span></div></li>
                    </ul>
                </header>
            </div>
        );
    }
}

export default NotificationBar;