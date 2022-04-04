import { combineReducers } from "redux";
import auth from "./auth";
import navigation from "./navigation";
import alerts from "./alerts";
import register from "./register";
import Categories from "./Categories";
import Grapgh from "./Grapgh";
import Notification from "./Notification";
import Timeline from "./Timeline";
import Latest from "./latest";
import article from "./article";
import ticker from "./ticker";
import articleList from "./articleList";
import articleData from "./articleData";

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  Categories,
  Grapgh,
  Notification,
  Timeline,
  Latest,
  article,
  ticker,
  articleList,
  articleData
});
