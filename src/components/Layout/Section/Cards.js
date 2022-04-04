import React, { useEffect ,useState} from "react";
import "./cards.css";
import { connect, useDispatch } from "react-redux";
import { getLatest } from "../../../actions/latest";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import ReactPaginate from 'react-paginate'
import "./Truncate.scss";
function Cards(props) {
  const dispatch = useDispatch();
  const [pageCount, setpageCount] = useState(1)
  const [list, setlist] = useState([]);
  useEffect(() => {
    dispatch(getLatest(0));
  }, []);
  useEffect(() => {
setlist(props.Latest)
 setpageCount(props.Latest?(Math.abs((props.Latest.length)/12))+1:1)
 console.log(pageCount)


  }, [props.Latest]);
function handlechange(data){
dispatch(getLatest(data.selected))
}

console.log(pageCount)
  return (
    <div
      className=" media-queries"
      style={{ margin: "20px", backgroundColor: "white" }}
    >
      <section
        id="header"
        className="jumbotron text-center"
        style={{ color: "black", backgroundColor: "rgba(0, 0, 0, 0.001)"
      , boxShadow:"0 6px 10px rgb(0 0 0 / 0%), 0 0 0px rgb(0 0 0 / 0%)"
      
      }}
      >
        <h1 className="display-3"
        style={{fontSize:"30px"}}
        >Latest(Daily Lab)</h1>
      </section>
      <div className="row ">
        {list
          ? list.map((article) => (
              <div className=" col-lg-3 pb-2 text-dark">
              <Link
                      to={{
                        pathname: `/app/Articles/${article.id}`,
                        id: article.id,
                      }}
                    >
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
                    
                      <a className="btn btn-outline-dark">See more..</a>
                   
                  </div>
                </div>
                </Link>
              </div>
             
            ))
          : " "}

      </div>
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
  );
}
const mapStateToProps = (store) => {
  return {
    Latest: store.Latest.payload,
  };
};
export default connect(mapStateToProps)(Cards);
