import React, { useState, useEffect, useLayoutEffect } from "react";
import Widget from "../../../components/Widget";
import s from "./Charts.module.scss";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import { connect } from "react-redux";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import Highcharts, { color } from "highcharts";
import config from "./config";
import image from '../../../Images/image0..png'
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

exporting(Highcharts);
exportData(Highcharts);

function Charts(props) {
  const colorLabel = ["black", "white"];

  function percentageError(value1, value2) {
    const data = [];
    data[0] = value1 - value2;
    data[1] = (data[0] / value1) * 100;
    return data;
  }
  function sourceInfo(){
    if(props.id===1){
      return "Pakistan Stock Exchange"
    }
    else if(props.id===2){
      return "State Bank of Pakistan"
    }
    else if(props.id===3){
      return "gold.pk"
    }
  }

  const colors = config.chartColors;
  let lineColors = [colors.blue, colors.green, colors.orange];
  const [yAxisdata, setyAxisdata] = useState([]);
  const [xAxisdata, setxAxisdata] = useState([]);

  const [lineOptions, setlineOptions] = useState({
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis'
    },
   
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: props.title,
        type: 'line',
        stack: 'Total',
        data: []
      },
  
    ]
  });
  const chart = () => {
    var xaxis = [];
    var yaxis = [];

    yaxis = props.GraphData.payload
      ? props.GraphData.payload[0].data[
          parseInt(props.id) === 0 ? parseInt(props.id) : parseInt(props.id) - 1
        ]["data"]["data"]
      : [];
    
    xaxis = props.GraphData.payload
      ? props.GraphData.payload[0]["data"][
          parseInt(props.id) === 0 ? parseInt(props.id) : parseInt(props.id) - 1
        ]["data"]["date"]
      : [];

    setxAxisdata(Object.assign([], xaxis));
    setyAxisdata(Object.assign([], yaxis));
    if (props.index) {
      props.index(yaxis[yaxis.length - 1]);
      const value = percentageError(
        yaxis[yaxis.length - 1],
        yaxis[yaxis.length - 2]
      );
   

props.date(xaxis[xaxis.length-1])
      if (parseFloat(yaxis[yaxis.length - 1] - yaxis[yaxis.length - 2]) > 0) {
        props.indexChange([
          parseFloat(value[0]).toFixed(3),
          "rgb(146,202,145)",
          parseFloat(value[1]).toFixed(3),
        ]);
      } else {
        props.indexChange([
          parseFloat(value[0]),
          "rgb(224, 51, 43)",
          parseFloat(value[1]).toFixed(3),
        ]);
      }
      const year = percentageError(
        yaxis[yaxis.length - 1],
        yaxis[yaxis.length - 366]
      );

      if (yaxis[yaxis.length - 1] - yaxis[yaxis.length - 365] > 0) {
        const data = [];
        data[0] = year[0].toFixed(3);
        data[1] = "rgb(146,202,145)";
        data[2] = year[1].toFixed(3);

        props.yearChange(data);
      } else {
        const data = [];
        data[0] = year[0].toFixed(3);
        data[1] = "rgb(224, 51, 43)";
        data[2] = year[1].toFixed(3);

        props.yearChange(data);
      }
      const month = percentageError(
        yaxis[yaxis.length - 1],
        yaxis[yaxis.length - 31]
      );
      if (yaxis[0] - yaxis[30] > 0) {
        const data = [];
        data[0] = month[0].toFixed(3);
        data[1] = "rgb(146,202,145)";
        data[2] = month[1].toFixed(3);
        props.MonthChange(data);
      } else {
        const data = [];
        data[0] = month[0].toFixed(3);
        data[1] = "rgb(224,51,43)";
        data[2] = month[1].toFixed(3);
        props.MonthChange(data);
      }
    }
  };

  useEffect(() => {
    chart();
  }, [props.id, props.GraphData.payload]);

  useEffect(() => {
    setlineOptions(
      Object.assign(
        {},
        {
          color:lineColors,
          title: {
            text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis'
          },
         
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisdata,
            splitLines:{
              show:false
            },
            axisLabel: {
              color: colorLabel[props.colorLabel],
            },
            splitLine:{
              show:false
            },
            axisLine: {
              onZero: true,
              lineStyle: {
                color: "black",
              },
            },
            axisLabel: {
              fontSize: 8,
          
              color: colorLabel[props.colorLabel],
    
            },
            
          },
          yAxis: {
            type: 'value',
            splitLine:{
              show:false
            },
            axisLabel: {
              color: colorLabel[props.colorLabel],
            },
            axisLine: {
              lineStyle: {
                color: "black",
              },
            },
            axisLabel: {
              fontSize: 8,
          
              color: colorLabel[props.colorLabel],
    
            },
          },
          series: [
            {
              name: props.title,
              type: 'line',
              stack: 'Total',
              data: yAxisdata
            },
        
          ]
        }
      )
    );
  }, [yAxisdata, xAxisdata]);
  function slicing(range) {
    var yaxis = [];
    var xaxis = [];
    yaxis = props.GraphData.payload
      ? props.GraphData.payload[0].data[
          parseInt(props.id) === 0 ? parseInt(props.id) : parseInt(props.id) - 1
        ]["data"]["data"]
      : [];
    if (range > yaxis.length) {
      yaxis = yaxis.slice(0, yaxis.length);
    } else {
      yaxis = yaxis.slice(yaxis.length - range, yaxis.length);
    }

    xaxis = props.GraphData.payload
      ? props.GraphData.payload[0].data[
          parseInt(props.id) === 0 ? parseInt(props.id) : parseInt(props.id) - 1
        ]["data"]["date"]
      : [];
      if (range > xaxis.length) {
        xaxis = xaxis.slice(0, xaxis.length);
      } else {
        xaxis = xaxis.slice(xaxis.length - range, xaxis.length);;
      }
   

    setxAxisdata(xaxis);
    setyAxisdata(yaxis);
  }

  const initEchartsOptions = {
    renderer: "canvas",
  };

  {
    return (
      <div className={s.root}>
        <div>
          <h5>
            <span
              className="fw-semi-bold"
              style={{ color: colorLabel[props.colorLabel] }}
            >
              {" "}
              {props.title}{" "}
            </span>
          </h5>

          <div class="d-flex mb-2 text-white text-left">
            <a
              onClick={() => {
                slicing(7);
              }}
              class="nav-link text-left  bg-outline-secondary"
              style={{ color: colorLabel[props.colorLabel] }}
            >
              1W
            </a>
            <a
              onClick={() => {
                slicing(30);
              }}
              class="nav-link text-left bg-outline-secondary"
              style={{ color: colorLabel[props.colorLabel] }}
            >
              1M
            </a>
            <a
              onClick={() => {
                slicing(180);
              }}
              class="nav-link text-left  bg-outline-secondary"
              style={{ color: colorLabel[props.colorLabel] }}
            >
              6M
            </a>
            <a
              onClick={() => {
                slicing(365);
              }}
              class="nav-link text-left  bg-outline-secondary"
              style={{ color: colorLabel[props.colorLabel] }}
            >
              1Y
            </a>
            <a
              onClick={() => {
                slicing(1095);
              }}
              class="nav-link text-left bg-outline-secondary"
              style={{ color: colorLabel[props.colorLabel] }}
            >
              3Y
            </a>
            <a
              onClick={() => {
                slicing(1825);
              }}
              class="nav-link text-left  bg-outline-secondary"
              style={{ color: colorLabel[props.colorLabel] }}
            >
              5Y
            </a>
          </div>
          <ReactEchartsCore
            echarts={echarts}
            option={lineOptions}
            opts={initEchartsOptions}
            style={{ height: "300px", width: "100%" ,marginRight:"0px",marginLeft:"0px"}}
          />
          <div class="col-lg-12" style={{ display: "flex",color:colorLabel[props.colorLabel] }}>
          <div class="col-lg-6" style={{ display: "inline" }}>
            <p
              style={{
                marginRight: "30px",
                fontWeight: "bold",
                display: "inline",
              }}
              class="text-left"
            >
              thewolf.com.co
            </p>
          </div>
          <div class="col-lg-6" style={{ display: "inline" }}>
            <p
              style={{
                display: "inline",
                right: "0px",
                paddingLeft: "0px",
                color:colorLabel[props.colorLabel]
              }}
              class="text-right "
            >
              <b>Source: </b>{sourceInfo()}
            </p>
          </div>
        </div> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    GraphData: store.Grapgh,
  };
};
export default connect(mapStateToProps)(Charts);
