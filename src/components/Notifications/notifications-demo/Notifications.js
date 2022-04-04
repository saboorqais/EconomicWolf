import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

import s from "./ListGroup.module.scss";

import a3 from "../../../assets/people/a3.jpg";

import { connect } from "react-redux";

class NotificationsDemo extends React.Component {


  render() {
    return (
      <ListGroup className={[s.listGroup, "thin-scroll"].join(" ")}>
        {this.props.notification
          ? this.props.notification.map((value) => {
              return (
                <ListGroupItem className={s.listGroupItem}>
                  <span className={[s.notificationIcon, "thumb-sm"].join(" ")}>
                  
                  </span>
                  <p className="m-0 overflow-hidden">
                    {value["header"]}
                    {" "+ "(" +value['country_category']+")"}
                    <time className="help-block m-0">{value["time"]}</time>
                  </p>
                </ListGroupItem>
              );
            })
          : ""}
        
      </ListGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.Notification.payload,
  };
};
export default connect(mapStateToProps)(NotificationsDemo);
