import React, { useEffect, useState } from "react";
import echarts from "echarts/lib/echarts";
import Widget from "../../../components/Widget";
import s from "./Charts.module.scss";
import ReactEchartsCore from "echarts-for-react/lib/core";
import { connect } from "react-redux";
import image from "../../../Images/image0..png";
function StackedLineChart(props) {
  var colorList = [
    "#f42d42",
    "#8b5cb4",
    "#00FFFF",
    "#2b6aff",
    "#efb8a1",
    "#fff200",
    "#ee9dc2",
    "#ff7bac",
    "#03d2b2",
    "#66FF66",
  ];
  if (props.name === "Exports") {
    colorList = [
      "#f42d42",
      "#8b5cb4",
      "#66FF66",
      "#2b6aff",
      "#efb8a1",
      "#fff200",
      "#ee9dc2",
      "#ff7bac",
      "#03d2b2",
      "#66FF66",
    ];
  }

  if (props.name === "Remittances") {
    colorList = [
      "#f42d42",
      "#8b5cb4",
      "#00FFFF",
      "#2b6aff",
      "#efb8a1",
      "#fff200",
      "#66FF66",
      "#ff7bac",
      "#03d2b2",
      "#66FF66",
    ];
  }
  function percentageError(value1, value2) {
    const data = [];
    data[0] = (value1 - value2).toFixed(3);
    data[1] = ((data[0] / value2) * 100).toFixed(3);
    return data;
  }
  const [yaxis, setyaxis] = useState();
  const [xaxis, setxaxis] = useState();
  const Xaxis = props.GraphData.payload
    ? props.GraphData.payload[1]["data"][
        props.id === 0 ? props.id : props.id - 1
      ]["dates"]
    : [];
  var dataList = props.GraphData.payload
    ? props.GraphData.payload[1]["data"][
        props.id === 0 ? props.id : props.id - 1
      ]["data"]
    : [];
  function getSlicedList(range) {
    return props.GraphData.payload
      ? props.GraphData.payload[1]["data"][
          props.id === 0 ? props.id : props.id - 1
        ]["data"].map((value) => ({
          name: value["name"],
          type: "line",
          stack: "Total",
          label: {
            show: false,
            position: "top",
          },

          emphasis: {
            focus: "series",
          },
          data: value["data"].slice(
            value["data"].length - range,
            value["data"].length
          ),
        }))
      : [];
  }
  function getYaxisList() {
    var x = 0;
    const data = props.GraphData.payload
      ? props.GraphData.payload[1]["data"][
          props.id === 0 ? props.id : props.id - 1
        ]["data"].map((value) => {
          const val = {
            name: value["name"],
            type: "line",
            stack: "Total",
            label: {
              show: false,
              position: "top",
            },
            areaStyle: {
              color: colorList[x],
            },
            LineStyle: {
              color: colorList[x],
            },

            emphasis: {
              focus: "series",
            },
            data: value["data"],
          };
          x = x + 1;
          return val;
        })
      : [];
    return data;
  }
  useEffect(() => {
    const data = getYaxisList();
    setxaxis(Xaxis);
    setyaxis(Object.assign([], data));
    const date = props.GraphData.payload
      ? props.GraphData.payload[1]["data"][
          props.id === 0 ? props.id : props.id - 1
        ]["dates"]
      : [];
    var keys = props.GraphData.payload
      ? props.GraphData.payload[1]["data"][
          props.id === 0 ? props.id : props.id - 1
        ]
      : {};
    if (props.name === "Exports") {
      props.totalbyHand(keys["total_exports"]);
    }
    if (props.name === "Imports") {
      props.totalbyHand(keys["total_imports"]);
    }
    if (props.name === "Remittances") {
      props.totalbyHand(keys["total_remittance"]);
    }

    props.date(date ? date[date.length - 1] : 0);
    if (props.total) {
      const total = props.GraphData.payload
        ? props.GraphData.payload[1]["data"][
            props.id === 0 ? props.id : props.id - 1
          ]["total"]
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
        total[total.length - 13]
      );
      props.YearChange([
        year[0],
        year[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        year[1],
      ]);

      props.total(total[total.length - 1]);
    }
  }, [props.id, props.GraphData.payload]);

  const initEchartsOptions = {
    renderer: "canvas",
  };
  function getSliceList(slicingNumebr) {
    var yaxis = [];
    var xaxis = [];
    yaxis = getSlicedList(slicingNumebr);
    xaxis = Xaxis.slice(Xaxis.length - slicingNumebr, Xaxis.length - 1);

    setxaxis(xaxis);
    setyaxis(yaxis);
  }

  const option = {
    color: colorList,
    tooltip: {
      trigger: "axis",
      confine: true,
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      textStyle: {
        color: "white",
      },

      itemGap: 1,
      padding: 5,
      data: [
        dataList.map((value) => {
          return value.name;
        }),
      ][0],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
      xaxis: {
        line: false,
      },
      show: false,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLabel: {
          fontSize: 8,
          color: "white",
          fontWeight: "bolder",
        },

        data: Object.assign([], xaxis),
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          fontSize: 8,
          color: "white",
          fontWeight: "bolder",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: Object.assign([], yaxis),
  };

  return (
    <div className={s.root} id="echarts">
      <div>
        <Widget
          title={
            <h5>
              <span className="fw-semi-bold">{props.name} </span>
            </h5>
          }
          option={["sa", "sd"]}
          close
          collapse
          style={{ padding: "0px" }}
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
          <ReactEchartsCore
            echarts={echarts}
            option={option}
            opts={initEchartsOptions}
            style={{ height: "300px", width: "100%" }}
          />

          <div>
            <div class="col-lg-12" style={{ display: "flex" ,color:"white"}}>
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
                  <b>Source: </b>State Bank of Pakistan
                </p>
              </div>
            </div>
          </div>
        </Widget>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    GraphData: state.Grapgh,
  };
};
export default connect(mapStateToProps)(StackedLineChart);
