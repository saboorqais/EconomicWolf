import React from "react";
import "./Articles.css";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getArticle } from "../../../actions/article";
import { toInteger } from "lodash";
import parse from "html-react-parser";
import { getArticledata } from "../../../actions/articleData";

function Articles(props) {
  const dispatch = useDispatch();
console.log("asdad")
  const id = toInteger(props.location.pathname.split("/").pop());
  console.log("This is article id:"+id)
  const articleData = props.article["payload"];
  console.log(articleData)
  useEffect(() => {
    dispatch(getArticledata(id));
  }, []);

  useEffect(() => {
    const id = toInteger(props.location.pathname.split("/").pop());
    console.log("This is article id:"+id)

    console.log(articleData)

  }, [props.article]);


  return (
    <div
      className=" mt-5  text-dark "
      style={{
        borderRadius: "20px",
        marginRight: "20px",
        marginLeft: "20px",
        backgroundColor:"white"
      }}
    >
    {console.log(articleData ? articleData["data"] : "" )}
      <div className="container mt-5">
      <div dangerouslySetInnerHTML={{ __html: articleData ? articleData["data"] : "" }} />
      
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
