import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Categories.css";
import ReactPaginate from 'react-paginate'
import { getCatogeries } from "../../../actions/Categories";
function Categories(props) {
  const [List, setList] = useState([]);
  const [pageCount, setpageCount] = useState(8);
  const dispatch = useDispatch()
  useEffect(() => {
  dispatch(getCatogeries(1))
  }, [])
  useEffect(() => {
    setList(
      props.Categories.payload ? props.Categories.payload: []
    )
    setpageCount(props.Categories.payload?(Math.abs((props.Categories.payload.length)/12))+1:0)
  }, [props.Categories.payload]);
  function handlechange(data){
    dispatch(getCatogeries(data.selected+1))
    }

  return (
    <div className=" " style={{ margin: "25px" }}>
      <h1 className="h1 text-dark text-center" style={{ margin: "25px" }}>
        {" "}
        Article Categories
      </h1>
      {(() => {
        if (props.Categories.payload) {
        
          return (
            <div className="row pt-5 m-auto ">
              {List.map((category) => (
                <Link className="col-md-2 col-lg-3 pb-4 text-dark"
                to={{
                  pathname: `/app/ArticlesList/${category.name}/${category.id}`,
                  id: category.id,
                }}
              >
              
                  <div className="card card-custom bg-none border-white border-1"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  
                    boxShadow:"0 6px 10px rgb(0 0 0 / 0%), 0 0 0px rgb(0 0 0 / 0%)"
                  }}
                  >
                    <img
                  style={{objectFit:"cover",overflow:"auto",height:"200px"}}
                    src={category["thumbnail"]}
                      alt=""
                      className="card-img-top"
                    />

                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6">
                          <h4 className=" card-title"
                          style={{fontWeight:"bold"}}
                          >{category.name}</h4>
                        </div>
                        <div className="col-lg-6 text-left">
                          <p>{category['upload_date']}</p>
                        </div>
                      </div>

                      <p className="card-text  text-light">{category.details}</p>
                    </div>
                    
                  </div>
             
                </Link>
              ))}
            </div>
          );
        } else {
          return <div className="card " style={{ margin: "25px" }}></div>;
        }
      })()}
      <div className="demo">
        <nav className="pagination-outer" aria-label="Page navigation"
        style={{backgroundColor:"white"}}
        >
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
        </nav>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    Categories: store.Categories,
  };
};

export default connect(mapStateToProps)(Categories);
