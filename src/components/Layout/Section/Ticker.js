import "./ticker.css";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getTickerData } from "../../../actions/ticker";
import parse from "html-react-parser";
import "./Indicators.css"
function Ticker(props) {
  const dispatch = useDispatch();

  var graphData = props.Graph ? props.Graph[0].data : [];
  var graphValues = [];
  if (graphData) {
    graphData.map((value) => {
      var indexes = value.data["data"];
      var addedValues = {};
      addedValues["name"] = value.name;
      addedValues["index"] = indexes[indexes.length - 1];
      addedValues["LastDayindex"] = indexes[indexes.length - 2];
      graphValues.push(addedValues);
    });
  
  }
  function getHtml(graphValues) {
    if (graphValues["index"] - graphValues["LastDayindex"] > 0) {
      return (
       <p
          style={{
            color: "rgb(146,202,145)"
          }}
        >
          <div
            className={"arrow-up"}
            style={{ color: "rgb(146,202,145)" }}
          ></div>
          {graphValues['name']}:{graphValues['index']}
        </p>
      );
    } else {
      return (
        <p
          style={{
          
            color: "rgb(224, 51, 43)",
          }}
        >
          <div
            className={"arrow-down"}
            style={{ color: "rgb(224, 51, 43)" }}
          ></div>
          {graphValues['name']+":"+" "}{graphValues['index']}
        </p>
      )
    }
  }

  useEffect(() => {
    dispatch(getTickerData());
  }, [props.Graph]);

  var data = props.ticker ? props.ticker : [];

  return (
    <div class="ticker-wrap">
      <div class="ticker">
        {graphValues
          ? graphValues.map((ticker) => (
              <div className="ticker_item">
                {(getHtml(ticker))}
                
              </div>
            ))
          : []}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    ticker: state.ticker.payload,
    Graph: state.Grapgh.payload,
  };
};
export default connect(mapStateToProps)(Ticker);
