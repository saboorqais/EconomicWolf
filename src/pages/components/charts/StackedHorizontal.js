import React, { useState, useEffect } from "react";
import Widget from "../../../components/Widget";
import s from "./Charts.module.scss";
import image from '../../../Images/image0..png'
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import { connect } from "react-redux";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import Highcharts from "highcharts";
import config from "./config";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import { getGraphData } from "../../../actions/Graph";
import ReactApexChart from "react-apexcharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

exporting(Highcharts);
exportData(Highcharts);

function StackedHorizontal(props) {
  const [totalbar, settotalbar] = useState(0);
  let lineColors = ["#ffffff", "#00D01E", "#ffff00", "#ff0000", "#ffffff"];
  let colorList = [
    "#ffffff",
    "#00D01E",
    "#ffff00",
    "#ff0000",
    "#9932CC",
    "#7B68EE",
    "#E6E6FA",
    "",
    "",
  ];
  if (props.name === "Inflation") {
    lineColors = ["#ffffff", "#00D01E", "#ffff00", "#ff0000", "#ffffff"];
    colorList = [
      "#ffffff",
      "#00D01E",
      "#ffff00",
      "#ff0000",
      "#9932CC",
      "#7B68EE",
      "#E6E6FA",
      "",
      "",
    ];
  }
  if (props.name === "FX") {
    lineColors = ["#00D01E", "#ffff00", "#ffffff", "#ff0000", "#ffffff"];
    colorList = [
      "#00D01E",
      "#ffff00",
      "#ffffff",
      ,
      "#ff0000",
      "#9932CC",
      "#7B68EE",
      "#E6E6FA",
      "",
      "",
    ];
  }
  function getSource(){
if (props.name=="Foreign Investment"){
  return "State Bank of Pakistan"
}
else{
  return "Federal Board of Revenue"
}

  }
  function percentageError(value1, value2) {
    const data = [];
    data[0] = (value1 - value2).toFixed(3);
    data[1] = ((data[0] / value1) * 100).toFixed(3);
    return data;
  }
  const [yAxisdata, setyAxisdata] = useState();
  const [xAxisdata, setxAxisdata] = useState();
  const XaxisData = props.GraphData.payload
    ? props.GraphData.payload[1].data[
        parseInt(props.id) === 0 ? parseInt(props.id) : parseInt(props.id) - 1
      ]["data"][0]["dates"]
    : [];
  function getYaxisList() {
    var x = 0;
    return props.GraphData.payload
      ? props.GraphData.payload[1].data[
          parseInt(props.id) === 0 ? parseInt(props.id) : parseInt(props.id) - 1
        ]["data"][1]["data"].map((value) => {
          var value = {
            label: value["name"],
            data: value["data"],
            backgroundColor: colorList[x],
          };
          x = x + 1;
          return value;
        })
      : [];
  }
  function getSlicedList(range) {
    var x = 0;
    return props.GraphData.payload
      ? props.GraphData.payload[1].data[
          parseInt(props.id) === 0 ? parseInt(props.id) : parseInt(props.id) - 1
        ]["data"][1]["data"].map((value) => {
          var value = {
            name: value["name"],
            data: value["data"].slice(
              value["data"].length - range,
              value["data"].length
            ),
          };
          x = x + 1;

          return value;
        })
      : [];
  }
  useEffect(() => {
    setxAxisdata(XaxisData);
    setyAxisdata(getYaxisList());
    const date = props.GraphData.payload
      ? props.GraphData.payload[1]["data"][
          props.id === 0 ? props.id : props.id - 1
        ]["data"][0]["dates"]
      : [];
   
    props.date(date ? date[date.length - 1] : 0);
    if (props.name == "Tax") {
      var keys = props.GraphData.payload
      ? props.GraphData.payload[1]["data"][
          props.id === 0 ? props.id : props.id - 1
        ]
      : {};
        props.totalbyHand(keys["total_tax"]);
      
      const total = props.GraphData.payload
        ? props.GraphData.payload[1]["data"][
            props.id === 0 ? props.id : props.id - 1
          ]["data"][1]["data"][0]["data"]
        : [];
        const indexTotal = props.GraphData.payload
      ? props.GraphData.payload[1]["data"][
          props.id === 0 ? props.id : props.id - 1
        ]["data"][0]["total"]
      : [];

      const month = percentageError(
        total[total.length - 1],
        total[total.length - 2]
      );
      props.MonthChange([
        month[0],
        month[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        month[1],
      ]);
      const year = percentageError(
        total[total.length - 1],
        total[total.length - 12]
      );
      props.YearChange([
        year[0],
        year[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        year[1],
      ]);
      props.total(indexTotal[indexTotal ? indexTotal.length - 1 : 0]);
    }
    if (props.name == "Foreign Investment") {
      var keys=props.GraphData.payload
      ? props.GraphData.payload[1]["data"][
          props.id === 0 ? props.id : props.id - 1
        ]:{}
var key=Object.keys(keys)[2]
props.totalbyHand(keys[key])
      const total = props.GraphData.payload
        ? props.GraphData.payload[1]["data"][
            props.id === 0 ? props.id : props.id - 1
          ]["data"][1]["data"][0]["data"]
        : [];
      
        const indexTotal = props.GraphData.payload
        ? props.GraphData.payload[1]["data"][
            props.id === 0 ? props.id : props.id - 1
          ]["data"][0]["Total"]
        : [];
      const month = percentageError(
        total[total.length - 1],
        total[total.length - 2]
      );
      props.MonthChange([
        month[0],
        month[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        month[1],
      ]);
      const year = percentageError(
        total[total.length - 1],
        total[total.length - 12]
      );
      props.YearChange([
        year[0],
        year[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        year[1],
      ]);
      props.total(indexTotal[indexTotal ? indexTotal.length - 1 : 0]);
    }
  }, [props.id, props.GraphData.payload]);

  function getSliceList(slicingNumber) {
    var yaxis = [];
    var xaxis = [];
    yaxis = getSlicedList(slicingNumber);
    xaxis = XaxisData.slice(XaxisData.length - slicingNumber, XaxisData.length);

    setxAxisdata(xaxis);
    setyAxisdata(yaxis);
  }

  const series1 = { labels: xAxisdata, datasets: getYaxisList() };

  const options = {
    plugins: {
      tooltip: {
        mode: "index",
        callbacks: {
          filter: function (context) {
           
            return context.dataIndex === 0;
          },
          label: function (context) {
      
            var keys = Object.keys(context.parsed._stacks.y);
            var datapoints = context.parsed._stacks.y;

            var Total = 0;
            keys.map((key) => {
              if (typeof parseInt(key) === "number") {
                Total = Total + datapoints[`${key}`];
              }
            });

            var x = 0;
            settotalbar(Total)
            props.totalBar(Total)

            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }

            return label;
          },
          title: function (context) {
         
         
            return "Total: "+totalbar.toFixed(3)+" "+"Date:"+context[0].label;
          },
        },
      },
      legend: {
        labels: {
          color: "white", // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 12, // 'size' now within object 'font {}'
          },
        },
      },
      title: {
        display: true,
      },
    },

    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        stacked: true,
        labels: {
          fontColor: "white",
          fontSize: 14,
        },
      },
    },
  };
  {
    return (
      <div className={s.root}>
        <div>
          <Widget
            style={{ padding: "0px" }}
            title={
              <h5>
                <span className="fw-semi-bold"> {props.title} </span>
              </h5>
            }
            option={["sa", "sd"]}
            close
            collapse
          >
            <div class="d-flex mb-2 text-white text-left">
              <a
                onClick={() => {
                  getSliceList(6);
                }}
                class="nav-link text-left  bg-outline-secondary"
              >
                6M
              </a>
              <a
                onClick={() => {
                  getSliceList(12);
                }}
                class="nav-link text-left  bg-outline-secondary"
              >
                1Y
              </a>
              <a
                onClick={() => {
                  getSliceList(36);
                }}
                class="nav-link text-left bg-outline-secondary"
              >
                3Y
              </a>
              <a
                onClick={() => {
                  getSliceList(60);
                }}
                class="nav-link text-left  bg-outline-secondary"
              >
                5Y
              </a>
            </div>
            <div>
             
              <Bar width={300} height={500} options={options} data={series1} />
            </div>
            <div class="col-lg-12" style={{ display: "flex",color:"white" }}>
            <div class="col-lg-8" style={{ display: "inline" }}>
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
            <div class="col-lg-8" style={{ display: "inline" }}>
              <p
                style={{
                  display: "inline",
                  right: "0px",
                  paddingLeft: "0px",
                }}
                class="text-right "
              >
                <b>Source: </b>{getSource()}
              </p>
            </div>
          </div>
          </Widget>
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
export default connect(mapStateToProps)(StackedHorizontal);
