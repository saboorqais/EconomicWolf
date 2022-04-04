import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  openSidebar,
  closeSidebar,
  changeSidebarVisibility,
} from "../../actions/navigation";
import s from "./Layout.module.scss";
import Section from "./Section/Section.js";
import Ticker from "./Section/Ticker";
import Footer from "./Section/Footer";
import Timeline from "./Section/Timeline";
import Cards from "./Section/Cards";
import Contact from "./Section/Contact";
import Quiclinks from "./Section/QuickLInks";
import Articles from "./Section/Articles";
import Categories from "./Section/Categories";
import ArticlesList from "./Section/ArticlesList";
import Indicators from "./Section/Indicators";
import AboutUs from "./Section/AboutUs";
import { getGraphData } from "../../actions/Graph";
import Advertise from "./Section/Advertise";
import Search from "./Section/Search";
import { getTickerData } from "../../actions/ticker";

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };
  constructor(props) {
    super(props);
    this.props.dispatch(getGraphData(() => {}));
    this.props.dispatch(closeSidebar());
    this.props.dispatch(changeSidebarVisibility("hide"));
  
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          "sidebar-" + this.props.sidebarPosition,
          "sidebar-" + this.props.sidebarVisibility,
        ].join(" ")}
      >
        <div className={s.wrap}>
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}

          <Header />
          <Quiclinks />
          <Ticker />
          <Sidebar />

          <Switch>
         
            <Route path="/" exact component={Section} />
            <Route path="/app/latest" exact component={Cards} />
            <Route path="/app/Timeline" exact component={Timeline} />
            <Route path="/app/Contact" exact component={Contact} />
            <Route path="/app/Articles/:id" exact component={Articles} />
            <Route path="/app/categories" exact component={Categories} />
            <Route path="/app/AboutUs" exact component={AboutUs} />
            <Route path="/app/Advertise" exact component={Advertise} />
            <Route
              exact
              path="/app/Articleslist/:name/:id"
              component={ArticlesList}
            />
            <Route path="/app/Indicators/"  exact component={Indicators} />
            <Route path="/app/query/:keyword" exact component={Search} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default connect(mapStateToProps)(Layout);

/**
 * <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
             
              <TransitionGroup>
                <CSSTransition
              
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route path="/app/main" exact render={() => <Redirect to="/app/main/dashboard" />} />
                    <Route path="/app/main/dashboard" exact component={Dashboard} />
                    <Route path="/app/components/icons" exact component={UIIcons} />
                    <Route path="/app/notifications" exact component={UINotifications} />
                    <Route path="/app/components/charts" exact component={Charts} />
                    <Route path="/app/tables" exact component={TablesStatic} />
                    <Route path="/app/components/maps" exact component={MapsGoogle} />
                    <Route path="/app/typography" exact component={CoreTypography} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}>
                Light Blue React Template - React admin template made by <a href="https://flatlogic.com" >Flatlogic</a>
              </footer>
            </main>
          </Hammer>
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
