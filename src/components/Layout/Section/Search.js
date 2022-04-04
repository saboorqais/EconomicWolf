import React, { useEffect } from "react";
import { toInteger } from "lodash";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./ArticleList.css";
import withRouter from "react-router/withRouter";
import parse from 'react-html-parser'
import { getArticle } from "../../../actions/article";
function Search(props) {
  console.log(props);
  const dispatch = useDispatch()
  var searchedkey = props.history.location.pathname.split("/");
  searchedkey = searchedkey[searchedkey.length - 1];

  const id = toInteger(props.location.pathname.split("/").pop());
  var categoryArticles = props.ArticleList?props.ArticleList.results:[];

  useEffect(() => {

dispatch(getArticle())
  }, [])
 
  var articledata = [];
  for (let index = 0; index < categoryArticles.length; index++) {
    
    if (categoryArticles[index].name.toLowerCase().includes(searchedkey.toLowerCase())) {
      articledata.push(categoryArticles[index]);
    }
  }
  function search(){
    if(articledata.length>0){
      return(
        articledata.map((article) => (
          <div className=" col-lg-3 pb-2 text-dark" 
          style={{display:"inline-block"}}>
          <div
            className="card card-custom bg-none border-white border-1"
            style={{
              backgroundColor: "white",
              borderRadius: "0%",
              height: "400px",
              boxShadow:
                "0 0px 0px rgb(0 0 0 / 0%), 0 0 0px rgb(0 0 0 / 0%)",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                overflow: "auto",
                height: "150px",
              }}
              src={article["thumbnail"]}
              alt=""
              className="card-img-top"
            />

            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <p>{article.category}</p>
                  <h4
                    className="card-title text-ellipsis--3"
                    style={{ fontWeight: "bold" }}
                  >
                    {article.name}
                  </h4>
                </div>
              </div>
            </div>
            <div
              className="card-footer"
              style={{ background: "inherit", borderColor: "inherit" }}
            >
              <div
                style={{ bottom: "0px",marginLeft:"-17px" }}
                className="col-lg-12 text-left"
              >
                <p>{article["upload_date"]}</p>
              </div>
              <Link
                to={{
                  pathname: `/app/Articles/${article.id}`,
                  id: article.id,
                }}
              >
                <a className="btn btn-outline-dark">See more..</a>
              </Link>
            </div>
          </div>
        </div>
        ))
      )
    }else{
     return <h1>Loading results of {searchedkey}.....</h1>
    }



  }

  return (
    <div className=" " style={{ margin: "25px",color:"black" }}>
      <h1 className="text-dark  text-center" style={{ margin: "25px" }}>
       
        You searched for <b>{searchedkey}</b>
      </h1>

      {search()}
    </div>
  );
}
const mapStateToProps = (store) => {
  return {
    ArticleList:store.article.payload
  };
};
export default withRouter(connect(mapStateToProps)(Search));
