import React from 'react';
import {
  ButtonGroup,
  Button,
} from 'reactstrap';
import NotificationsDemo from './notifications-demo/Notifications';
import NewNotificationsDemo from './notifications-demo/NewNotifications';

import {connect} from "react-redux"
import s from './Notifications.module.scss';

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationsTabSelected: 1,
      newNotifications: null,
      isLoad: false,
    };
  }

  changeNotificationsTab(tab) {
    this.setState({
      notificationsTabSelected: tab,
      newNotifications: null,
    });
  }

  loadNotifications() {
    this.setState({
      isLoad: true,
    });

    setTimeout(() => {
      this.setState({
        newNotifications: (<NewNotificationsDemo />),
        isLoad: false,
      });
    }, 1500);
  }

  render() {
    let notificationsTab = (<NotificationsDemo />);


 

    return (
      <section className={`${s.notifications} navbar-notifications horizontal`} >
        <header className={[s.cardHeader, 'card-header'].join(' ')}
       
        >
          <div className="text-center mb-sm">
    
          </div>
          <ButtonGroup className={s.notificationButtons}>
            <Button outline color="default" size="sm" className={s.notificationButton} onClick={() => this.changeNotificationsTab(1)} active={this.state.notificationsTabSelected === 1}>Notifications</Button>
          </ButtonGroup>
        </header>

        {this.state.newNotifications || notificationsTab}
    
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.Notfication
  }
}
export default connect(mapStateToProps)(Notifications)
