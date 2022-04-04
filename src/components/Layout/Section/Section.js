import React from "react";
import Charts from "../../../pages/components/charts/DailyCharts";
import Section2 from "./Section2";
import image0 from "../../../Images/Comp 1_3.gif";
import "./Section.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLatest } from "../../../actions/latest";
import "./Section.scss";
import './Truncate.scss'
function Section(props) {
  const dispatch = useDispatch();
  const [List, setList] = useState([]);




  useEffect(() => {
    dispatch(getLatest());
  }, []);
  useEffect(() => {
    setList(props.Latest.payload ? props.Latest.payload.slice(0,8) : []);
  }, [props.Latest.payload]);
  return (
    <div className="container " style={{ color: "black" }}>
      <div className="row" style={{ paddingTop: "20px" }}>
        <div className="col-lg-1"></div>
        <div className="col-lg-4">
          <h1 className="mb-2 display-9" style={{ fontWeight: "bold" }}>
            Economic Hub
          </h1>

          <p className="text-">
            Connecting decision makers to a vast network of information, our
            terminal facilitates the audience to understand the forces shaping
            Pakistan's economic system with immersive data visualizations and
            news that go beyond stats and charts to turn their knowledge into
            action.
          </p>
          <Link to="/app/latest">
            <button className="btn btn-outline-dark">Latest</button>
          </Link>
          <Link to="/app/Indicators">
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-outline-dark"
            >
              Indicators
            </button>
          </Link>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-5 text-center Padding-for-pics"
        style={{padding:"0px 0px"}}
        >
          <img
            src={image0}
            style={{ borderWidth: "0px" 
          ,padding:"0px"
          }}
            alt=""
            className="d-inline-block align-middle"
          />
        </div>
      </div>
      <div className="container">
        <div className="row" style={{ marginTop: "100px" }}>
          <div className="col-lg-1"></div>
          <div
            className="col-lg-5"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <Charts id="1" title="KSE100" colorLabel={0} />
          </div>
          <div
            className="col-lg-5"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <Charts id="2" title="PKR/USD" colorLabel={0} />
          </div>
        </div>
      </div>
      <div className="">
        {(() => {
          if (props.Latest.payload) {
            return (
              <div className="row pt-5 m-auto ">
                {List.map((category) => (
                  <div className="col-lg-3 pb-2 ">
                    <div
                      id="f1"
                      className="  card card-custom bg-none border-white border-1  "
                      style={{
                        backgroundColor: "white",
                        boxShadow:
                          "0 6px 10px rgb(0 0 0 / 0%), 0 0 0px rgb(0 0 0 / 0%)",
                          height: "370px",
                      }}
                    >
                      <img
                        style={{ height: "150px", objectFit: "cover" }}
                        src={category["thumbnail"]}
                        alt=""
                        className="card-img"
                      />

                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-12">

                          <p>{category.category}</p>
                              <h4
                                className="card-title  text-ellipsis--3"
                                style={{ fontWeight: "bold" }}
                              >
                                {category.name}
                              </h4>
                        
                          </div>
                          
                        </div>
                      </div>
                      <div
                        className="card-footer"
                        style={{
                          background: "inherit",
                          borderColor: "inherit",
                        }}
                      >
                      <div 
                      style={{marginLeft:"-17px"}}
                      className="col-lg-12 ">
                            <p>{category["upload_date"]}</p>
                          </div>
                        <Link
                          to={{
                            pathname: `/app/Articles/${category.id}`,
                            id: category.id,
                          }}
                        >
                          <a className="btn btn-outline-dark">See more..</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          } else {
            return <div className="card " style={{ margin: "25px" }}></div>;
          }
        })()}
      </div>

      <Section2 />
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    Latest: store.Latest,
  };
};

export default connect(mapStateToProps)(Section);
