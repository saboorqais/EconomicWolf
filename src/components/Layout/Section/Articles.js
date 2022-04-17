import React from "react";
import "./Articles.css";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getArticle } from "../../../actions/article";
import { toInteger } from "lodash";
import parse from "html-react-parser";
import { getArticledata } from "../../../actions/articleData";
import { Helmet } from "react-helmet";
function Articles(props) {
  const dispatch = useDispatch();
  console.log("asdad");
  const id = toInteger(props.location.pathname.split("/").pop());
  console.log("This is article id:" + id);
  const articleData = props.article["payload"];
  console.log(articleData);
  useEffect(() => {
    dispatch(getArticledata(id));
  }, []);

  useEffect(() => {
    const id = toInteger(props.location.pathname.split("/").pop());
    console.log("This is article id:" + id);
  }, [props.article]);

  return (
    <div
      className="  text-dark "
      style={{
        borderRadius: "20px",
        marginRight: "20px",
        marginLeft: "20px",
        backgroundColor: "white",
        paddingTop:"0px",
      }}
    >
      
      <div className="container mt-5">
     
      <h2 className="ResponsiveCategory h2 font-weight-bold">{articleData? articleData.category:" "}</h2>
      <h1 className="ResponsiveHeader h1 font-weight-bold">{articleData? articleData.name:" "}</h1>
      <div  class="col-lg-12">
      <img className="center " src={articleData? articleData.thumbnail:" "}/>
      </div>
      <h2 className="ResponsiveCategory h2 font-weight-bold">{articleData? articleData.upload_date:" "}</h2>
      <div
          dangerouslySetInnerHTML={{
            __html: articleData ? articleData.bullets : "",
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: articleData ? articleData["data"] : "",
          }}
        />
      </div>
    </div>
  );
}

function mapStateToProps(store) {
  return {
    article: store.articleData,
  };
}

export default connect(mapStateToProps)(Articles);
