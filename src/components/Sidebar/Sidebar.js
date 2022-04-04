import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup";
import {
  changeSidebarVisibility,
  closeSidebar,
} from "../../actions/navigation";
import { changeActiveSidebarItem } from "../../actions/navigation";
import HomeIcon from "../Icons/SidebarIcons/HomeIcon";
import TypographyIcon from "../Icons/SidebarIcons/TypographyIcon";
import TablesIcon from "../Icons/SidebarIcons/TablesIcon";
import NotificationsIcon from "../Icons/SidebarIcons/NotificationsIcon";
import ComponentsIcon from "../Icons/SidebarIcons/ComponentsIcon";
import "./Sidebar.css";
import { getCatogeries } from "../../actions/Categories";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    activeItem: "",
  };

  constructor(props) {
    super(props);
    this.props.dispatch(getCatogeries());
  }

  componentDidMount() {
    this.element.addEventListener(
      "transitionend",
      () => {
        if (this.props.sidebarOpened) {
          this.element.classList.add(s.sidebarOpen);
        }
      },
      false
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
      if (nextProps.sidebarOpened) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = "";
        }, 0);
      }
    }
  }

  fetchCategories() {
    var categories = "";
    if (this.props.Categories.payload) {
      categories = this.props.Categories.payload.map((category) => {
        const categoryDic = {};

        categoryDic["header"] = category.name;
        categoryDic["link"] =
          "/app/Articleslist/" + category.name + "/" + category.id.toString();
        categoryDic["id"] = category.id;

        return categoryDic;
      });
 
var s=categories
s.push({
  header: "All Categoires..",
  link: "/app/categories",
})
      return  s;
    } else {
      var CategoryList = [];
      const categoryDic = {};
      categoryDic["header"] = "";
      categoryDic["link"] = "/app/category";
      return CategoryList.map(() => {
        return categoryDic;
      });
    }
  }
  render() {
    return (
      <nav
        style={{ color: "black" }}
        className={cx(s.root)}
        ref={(nav) => {
          this.element = nav;
        }}
      >
        <header className={s.logo}>
          <div
            class="close-icon"
            onClick={() => {
              this.props.dispatch(closeSidebar());
              this.props.dispatch(changeSidebarVisibility("hide"));
            }}
          >
            <div></div>
            <div></div>
          </div>
          <div>ECONOMIC WOLF</div>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            on={()=>{
              this.props.dispatch(closeSidebar())
              this.props.dispatch(changeSidebarVisibility("hide"))
            }}
            header="Home"
            isHeader
            iconName={<HomeIcon className={s.menuIcon} />}
            link="/"
            index="main"
          />
          <h5
            style={{ color: "black" }}
            className={[s.navTitle, s.groupTitle].join(" ")}
          >
            Menu
          </h5>
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
           
              on={()=>{
                this.props.dispatch(closeSidebar())
                this.props.dispatch(changeSidebarVisibility("hide"))
              }}
            activeItem={this.props.activeItem}
            header="Latest"
            isHeader
            iconName={<TypographyIcon className={s.menuIcon} />}
            link="/app/latest"
            index="core"
          />
          <LinksGroup
            onActiveSidebarItemChange={(t) =>
              this.props.dispatch(changeActiveSidebarItem(t))
            }
            on={()=>{
              this.props.dispatch(closeSidebar())
              this.props.dispatch(changeSidebarVisibility("hide"))
            }}
            activeItem={this.props.activeItem}
            header="Startups"
            isHeader
            iconName={<TablesIcon className={s.menuIcon} />}
            link="/app/Timeline"
            index="tables"
          />
         
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) => {
   
              this.props.dispatch(changeActiveSidebarItem(activeItem));
            }}
            onClick={()=>{this.props.dispatch(changeActiveSidebarItem("/app/charts"));}}
            activeItem={this.props.activeItem}
            header="Indicators"
            isHeader
            iconName={<ComponentsIcon className={s.menuIcon} />}
            on={()=>{
              this.props.dispatch(closeSidebar())
              this.props.dispatch(changeSidebarVisibility("hide"))
            }}
            link="/app/Indicators"
            index="charts"
            
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) => {
   
              this.props.dispatch(changeActiveSidebarItem(activeItem));
            }}
            onClick={()=>{this.props.dispatch(changeActiveSidebarItem("/app/charts"));}}
            activeItem={this.props.activeItem}
            header="Economics"
            isHeader
            iconName={<ComponentsIcon className={s.menuIcon} />}
            on={()=>{
              this.props.dispatch(closeSidebar())
              this.props.dispatch(changeSidebarVisibility("hide"))
            }}
            link="/app/Articleslist/Economics/8"
            index="charts"
            
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) => {
   
              this.props.dispatch(changeActiveSidebarItem(activeItem));
            }}
            onClick={()=>{this.props.dispatch(changeActiveSidebarItem("/app/charts"));}}
            activeItem={this.props.activeItem}
            header="Markets"
            isHeader
            iconName={<ComponentsIcon className={s.menuIcon} />}
            on={()=>{
              this.props.dispatch(closeSidebar())
              this.props.dispatch(changeSidebarVisibility("hide"))
            }}
            link="/app/Articleslist/Markets/9"
            index="charts"
            
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) => {
   
              this.props.dispatch(changeActiveSidebarItem(activeItem));
            }}
            onClick={()=>{this.props.dispatch(changeActiveSidebarItem("/app/charts"));}}
            activeItem={this.props.activeItem}
            header="CPEC"
            isHeader
            iconName={<ComponentsIcon className={s.menuIcon} />}
            on={()=>{
              this.props.dispatch(closeSidebar())
              this.props.dispatch(changeSidebarVisibility("hide"))
            }}
            link="/app/Articleslist/CPEC/10"
            index="charts"
            
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) => {
              this.props.dispatch(changeActiveSidebarItem(activeItem));
            }}
      
          on={()=>{
            this.props.dispatch(closeSidebar())
            this.props.dispatch(changeSidebarVisibility("hide"))
          }}
            activeItem={this.props.activeItem}
            header="Articles"
            isHeader
            iconName={<ComponentsIcon className={s.menuIcon} />}
            link="/app/articles"
            index="articles"
            childrenLinks={this.fetchCategories()}
          />
           <LinksGroup
        onActiveSidebarItemChange={(activeItem) =>
          this.props.dispatch(changeActiveSidebarItem(activeItem))
        }
        on={()=>{
          this.props.dispatch(closeSidebar())
          this.props.dispatch(changeSidebarVisibility("hide"))
        }}
        activeItem={this.props.activeItem}
        header="Advertise"
        isHeader
        iconName={<NotificationsIcon className={s.menuIcon} />}
        link="/app/Advertise"
        index="ui"
      />
      <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            this.props.dispatch(changeActiveSidebarItem(activeItem))
          }
          on={()=>{
            this.props.dispatch(closeSidebar())
            this.props.dispatch(changeSidebarVisibility("hide"))
          }}
          activeItem={this.props.activeItem}
          header="Contact Us"
          isHeader
          iconName={<NotificationsIcon className={s.menuIcon} />}
          link="/app/Contact"
          index="ui"
        />
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    Categories: store.Categories,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
