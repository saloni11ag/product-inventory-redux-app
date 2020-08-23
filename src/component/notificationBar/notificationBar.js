import React, { Component } from 'react';
import './notification.css'

class NotificationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <header style={{flex: "1"}}>
                    <ul id="navbar">
                        <li className="navbar-items"> <marquee className="notification-bar">Total products in invetory: <span>{this.props.total}</span></marquee></li>
                    </ul>
                </header>
            </div>
        );
    }
}

export default NotificationBar;