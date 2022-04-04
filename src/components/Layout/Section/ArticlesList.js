import React, { useEffect, useState } from "react";
import { toInteger } from "lodash";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import ReactPaginate from 'react-paginate'
import "./ArticleList.css";
import { getArticleList } from "../../../actions/ArticleList";
function ArticlesList(props) {
  const id = toInteger(props.location.pathname.split("/").pop());
  var categoryArticles = [];
  const [pageCount, setpageCount] = useState(1);
const dispatch=useDispatch();
  useEffect(() => {
 dispatch(getArticleList(id))
  }, [])
  useEffect(() => {

  setpageCount(props.ArticleList?((Math.abs((props.ArticleList.count)/12)<0?1:(Math.abs((props.ArticleList.count)/12)))):1)
  }, [props.ArticleList])
function handlechange(data){
dispatch(getArticleList(id,data.selected+1))
}
console.log(props.ArticleList
  ? props.ArticleList.results?props.ArticleList.results:""
  : "")

  return (
    <div className="marginMain">
      <h1 className="h1 text-dark  text-center" style={{ margin: "25px" }}>
        {" "}
        {props.ArticleList
          ? props.ArticleList.results.length===0?"No articles":props.ArticleList.results[0].category
          : ""}
      </h1>

      {props.ArticleList?props.ArticleList.results.map((article) => (
        <div
     
          class="card mb-3  "
          style={{
            color: "black",
            maxWidth: "640px",
            display: "inline-block",
            backgroundColor: "white",
            borderRadius: "0%",
            boxShadow: "0 0px 0px rgb(0 0 0 / 0%), 0 0 0px rgb(0 0 0 / 0%)",
          }}
        >
          <div class="row no-gutters widthForrow">
            <div class="col-4 size">
              <img src={article["thumbnail"]} class="card-img size" alt="..." 
              />
            </div>
            <div class="col-8">
              <div
                class="card-body"
                style={{ padding: "0px", paddingLeft: "1.25rem" }}
              >
                <h5 class="card-title">{article["category"]}</h5>
                <b 
                style={{fontWeight:"bold"}}
                class="card-text text-ellipsis--2">{article["name"]}</b>
                <p class="card-text text-dark">
                  <small class="">{article["upload_date"]}</small>
                </p>
                <Link
                to={{
                  pathname: `/app/Articles/${article.id}`,
                  id: article.id,
                }}>
                <a className="btn btn-outline-dark">See more..</a>
                </Link>
              </div>
             
            </div>
           
          </div>
        </div>
      )):[]}
      <div>
      
      <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={handlechange}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
      </div>
 
    </div>
  );
}
const mapStateToProps = (store) => {
  return {
    Categories: store.Categories.payload,
    ArticleList:store.articleList.payload
  };
};
export default connect(mapStateToProps)(ArticlesList);
