import "./header.css";
import image0 from "../../Images/image0..png";
import image1 from "../../Images/big.gif";
import { connect, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  openSidebar,
  closeSidebar,
  changeSidebarVisibility,
} from "../../actions/navigation";
import { Nav, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

import Notifications from "../Notifications";
import s from "./Header.module.scss";
import withRouter from "react-router/withRouter";
function Header(props) {
  console.log(props);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const dispatch = useDispatch();
  const [notification, setnotification] = useState(false);
  const Statesidebar = useSelector((state) => state.navigation.sidebarOpened);
  function handleSubmit(event) {
    event.preventDefault();
    var searchkey = event.target[0].value;
    props.history.push(`/app/query/${searchkey}`);
  }

  let menuRef = useRef(null);
  useEffect(() => {
    let handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setnotification(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div ref={menuRef} className="header">
      <a
        onClick={() => {
          if (!Statesidebar) {
            dispatch(openSidebar());
            dispatch(changeSidebarVisibility("show"));
          }
        }}
        href="#"
        className={!Statesidebar ? "menu example1" : "disappear"}
      >
        <span></span>
      </a>
      <div
        class={Statesidebar ? "close-icon ForMobileView" : "disappear"}
        onClick={() => {
          if (Statesidebar) {
            dispatch(changeSidebarVisibility("hide"));
            dispatch(closeSidebar());
          }
        }}
      >
        <div></div>
        <div></div>
      </div>

      <div id="displaytoberemoved1" class="col-lg-1"></div>
      <div class="col-lg-1" 
      style={{
        marginLeft:"0px"
      }}
      >
        <a href="#" class="navbar-brand">
          <img
            src={image0}
            width="60"
            alt=""
            class="d-inline-block align-middle mr-2"
          />

          <span class="text-uppercase  font-weight-bold">Economic wolf</span>
        </a>
      </div>

      <div class="col-lg-1" 
      style={{
        marginLeft:"12px"
      }}
      >
        <Nav className="ml-md-0"
        style={{
          width:"25px",
          height:"25px"
        }}
        >
          <Dropdown
            nav
            isOpen={notification}
            id="basic-nav-dropdown"
            className={`${s.notificationsMenu}`}
          >
            <DropdownToggle nav caret style={{ marginLeft:"12px",color: "#C1C3CF", padding: 0 ,width:"25px",height:"25px"}}
       
            >
              <img
                src={image1}
                style={{
                  marginLeft:"0px",
                  width:"inherit",
                  height:"inherit",
                  
                }}
                onClick={() => {
                  if (notification === false) {
        
                    setnotification(true);
                  } else {
                    setnotification(false);
                   
                  }
                }}
                className={` space d-sm-down-none ${s.badge}`}
                color="danger"
              />
            </DropdownToggle>
            <DropdownMenu
              right
              className={`${s.notificationsWrapper} py-0 animate__animated animate__faster animate__fadeInUp`}
            >
              <Notifications />
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </div>
      <div id="displaytoberemoved" style={{ display: "flex", width: "300px" }}>
        <div className="displayCheckInverse">
          <form
            onSubmit={handleSubmit}
            className="change"
            style={{ width: "300px" }}
          >
            <input
              type="text"
              name="Search"
              placeholder="Search"
              style={{ width: "150px", height: "40px" }}
            />
            <input
              style={{ marginLeft: "5px", height: "40px", height: "40px",marginTop:"-3px" }}
              className="btn btn-outline-dark"
              type="submit"
              value="Search"

              
            />
          </form>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
