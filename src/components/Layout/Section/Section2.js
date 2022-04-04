import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getTimelineData } from "../../../actions/Timeline";
import image from '../../../Images/map-01.png'
import "./section2.css";
function Section2(props) {
  const dispatch = useDispatch();
  var data = props.timeline ? props.timeline.slice(0, 7) : [];
  useEffect(() => {
    dispatch(getTimelineData());
  }, []);
  return (
    <div className="map page-content page-container" id="page-content" 
    style={{backgroundImage:`url(${image})`}}
    >
      <div className="padding">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-5">
            <p
              style={{
                fontSize: "20px",
                marginTop: "30px",
                textAlign: "justify",
                
              }}
            >
               
            </p>
          </div>
          <div className="col-lg-6">
            <div className="timeline2 p-4 block mb-4"  style={{boxShadow:"0px"}}>
              {data.map((content) => (
                <div className="tl-item active">
                  <div className="tl-dot b-warning"></div>
                  <div className="tl-content">
                    <div className="">
                      {content["name"] +
                        " " +
                        content["sector"] +
                        " " +
                        content["amount"]}
                    </div>
                    <div className="tl-date  mt-1">{content["year"]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (store) => {
  return {
    timeline: store.Timeline.payload,
  };
};
export default connect(mapStateToProps)(Section2);
