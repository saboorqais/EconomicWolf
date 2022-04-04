import React, { useEffect } from "react";
import { connect } from "react-redux";
import rocket from "../../../Images/NXJjhLYViA3zQGC-Rocket-PNG-Image.png";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTimelineData } from "../../../actions/Timeline";
import "./timeline.css";
import image from '../../../Images/map-01.png'
function Timeline(props) {
  const dispatch = useDispatch();
  function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}
  useEffect(() => {
    dispatch(getTimelineData());
  }, []);
function article(article){
  if(article['article']){
    
    return (
      <Link
        to={`/app/Articles/${article["article"][0]["id"]}`}
      >
        <a
         className="navlink" style={{ color: "white" }}>
          Click to see more...
        </a>
      </Link>
    );
  }
}
  return (
    <div className="map1" 
    style={{backgroundColor: "black" , backgroundImage:`url(${image})`, backgroundPosition: "center 223px"}}
    >
      <h1 className="text-center">Startup Timeline</h1>

      <div className="row">
        <div className="col-md-12">
          <div className="main-timeline">
            {props.timeline
              ? props.timeline.map((content) => (
                  <div class="timeline">
                    <a href="#" class="timeline-content">
                      <div class="timeline-icon">
                   <img
                   src={rocket}
                   />
                      </div>
                      <h3 class="title">{content["name"]}</h3>
                      <h3 style={{fontWeight:"bold"}} class="">{ (content["amount"]==="Undisclosed"?"":"$")+numberWithCommas( content["amount"])}</h3>
                      <h4 style={{fontWeight:"bold"}} class="description" >{content["sector"]}</h4>
                      <h4 style={{fontWeight:"bold"}} class="description">{content["leadInvestor"]}</h4>
                    
                      <h4 style={{fontWeight:"bold"}} class="description">{content["year"]}</h4>
                      {
                          article(content)

                      }
                    </a>
                   
                  </div>
                ))
              : []}
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
export default connect(mapStateToProps)(Timeline);
