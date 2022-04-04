import React, { useState, useEffect } from "react";
import Widget from "../../../components/Widget";
import s from "./Charts.module.scss";
import image from "../../../Images/image0..png";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";
import { connect } from "react-redux";
import "echarts/lib/chart/line";
import "./table.scss";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import Highcharts, { color } from "highcharts";
import config from "./config";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import { getGraphData } from "../../../actions/Graph";
exporting(Highcharts);
exportData(Highcharts);

function Charts(props) {
  function axis(params) {
    console.log(params);
    if (props.name === "Debt" || props.name === "Current Account") {
      return (
        params.value +
        " " +
        "Total " +
        props.title +
        " " +
        (params.seriesData.length ? "：" + params.seriesData[0].data : "")
      );
    } else if (props.name === "LSM") {
      return (
        params.value +
        " " +
        props.title +
        " " +
        (params.seriesData.length ? "：" + params.seriesData[3].data : "")
      );
    } else if (props.name === "FX") {
      return (
        params.value +
        " " +
        props.title +
        " " +
        (params.seriesData.length ? "：" + params.seriesData[2].data : "")
      );
    }else if(props.name==="Inflation"){
      return (
        params.value +
        " " +
        props.title +
        " " +
        (params.seriesData.length ? "：" + params.seriesData[0].data : "")
      );
    }
    
    else {
      return (
        params.value +
        " " +
        props.title +
        " " +
        (params.seriesData.length ? "：" + params.seriesData[2].data : "")
      );
    }
  }
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
  if (props.name === "LSM") {
    lineColors = ["#00D01E", "#ffff00", "#ffffff", "#ff0000", "#ffffff"];
    colorList = [
      "#00D01E",
      "#ffff00",
      "#FF0000",
      "#ffffff",
      "#ff0000",
      "#9932CC",
      "#7B68EE",
      "#E6E6FA",
      "",
      "",
    ];
  }
  if (props.name === "Debt") {
    lineColors = [
      "#ffffff",
      "#00D01E",
      "#ffff00",
      "#ff0000",
      "#9932CC",
      "#7B68EE",
      "#E6E6FA",
      "#ff7bac",
      "#03d2b2",
      "#66FF66",
    ];
    colorList = [
      "#ffffff",
      "#00D01E",
      "#ffff00",
      "#ff0000",
      "#9932CC",
      "#7B68EE",
      "#E6E6FA",
      "#ff7bac",
      "#03d2b2",
      "#66FF66",
    ];
  }
  function percentageError(value1, value2) {
    const data = [];
    data[0] = (value1 - value2).toFixed(3);
    data[1] = ((data[0] / value1) * 100).toFixed(3);
    return data;
  }
  var nameList = props.GraphData.payload
    ? props.GraphData.payload[1].data[
        parseInt(props.id) === 0 ? parseInt(props.id) : parseInt(props.id) - 1
      ]["data"][1]["data"]
    : [];
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
            name: value["name"],
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            lineStyle: {
              color: colorList[x],
            },
            emphasis: {
              focus: "series",
            },
            data: value["data"],
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
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            lineStyle: {
              color: colorList[x],
            },
            emphasis: {
              focus: "series",
            },
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
    if (props.name == "LSM") {
      const lsm = getYaxisList()[3] ? getYaxisList()[3]["data"] : [];
      const month = percentageError(lsm[lsm.length - 1], lsm[lsm.length - 2]);
      props.MonthChange([
        month[0],
        month[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        month[1],
      ]);
  
      const year = percentageError(lsm[lsm.length - 1], lsm[lsm.length - 13]);
      props.YearChange([
        year[0],
        year[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        year[1],
      ]);
      props.total(lsm[lsm.length - 1]);
    }
    if (props.name == "Debt") {
      var keys = props.GraphData.payload
        ? props.GraphData.payload[1]["data"][
            props.id === 0 ? props.id : props.id - 1
          ]
        : {};
        
    props.totalbyHand(keys.total_debt)
      const lsm = getYaxisList()[0] ? getYaxisList()[0]["data"] : [];

      const month = percentageError(lsm[lsm.length - 1], lsm[lsm.length - 2]);
      props.MonthChange([
        month[0],
        month[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        month[1],
      ]);
      const year = percentageError(lsm[lsm.length - 1], lsm[lsm.length - 13]);
      props.YearChange([
        year[0],
        year[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        year[1],
      ]);
      props.total(lsm[lsm.length - 1]);
    }

    if (props.name == "Current Account") {
      const total = props.GraphData.payload
        ? props.GraphData.payload[1]["data"][
            props.id === 0 ? props.id : props.id - 1
          ]["data"][1]["data"][0]["data"]
        : [];
      const month = percentageError(
        total[total.length - 1],
        total[total.length - 2]
      );
      var keys = props.GraphData.payload
      ? props.GraphData.payload[1]["data"][
          props.id === 0 ? props.id : props.id - 1
        ]
      : {};
      props.totalbyHand(keys['total_current_account'])
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
      props.total(total[total ? total.length - 1 : 0]);
    }
    if (props.name == "Inflation") {
      const total = props.GraphData.payload
        ? props.GraphData.payload[1]["data"][
            props.id === 0 ? props.id : props.id - 1
          ]["data"][1]["data"][0]["data"]
        : [];
      props.s(date ? date[date.length - 13] : 0);

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
        total[total.length - 13],
        year[0] > 0 ? "rgb(146,202,145)" : "rgb(224, 51, 43)",
        year[1],
      ]);
      props.total(total[total ? total.length - 1 : 0]);
    }
    if (props.name == "FX") {
      const total = props.GraphData.payload
        ? props.GraphData.payload[1]["data"][
            props.id === 0 ? props.id : props.id - 1
          ]["data"][1]["data"][2]["data"]
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
      props.total(total[total ? total.length - 1 : 0]);
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

  const initEchartsOptions = {
    renderer: "canvas",
  };

  const colors = config.chartColors;

  const line = {
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
    axisPointer: {
      label: {
        formatter: function (params) {
          var s = "";
          if (props.name === "Inflation") {
            s = "%";
          }
          if (props.name === "Dept") {
            props.totalBar(params.seriesData[0].data);
          }
          return axis(params);
        },
      },
    },
    legend: {
      paddingRight: 5,
      itemGap: 1,
      data: [
        nameList.map((value) => {
          return value.name;
        }),
      ][0],
      textStyle: {
        color: "white",
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: true,
          lineStyle: {
            color: "black",
          },
        },
        axisLabel: {
          fontSize: 8,
          color: "white",
          fontWeight: "bolder",
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return props.title + " " + params.value;
            },
          },
        },
        data: xAxisdata,
      },
      {
        type: "category",
        show: false,

        axisLine: {
          onZero: true,

          axisPointer: {
            label: {
              show: false,
            },
          },
        },
        axisPointer: {
          label: {
            show: false,
          },
        },
        data: xAxisdata,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "white",
        },
        axisLine: {
          lineStyle: {
            color: "black",
          },
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              var s = "";
              if (props.name === "Inflation") {
                s = "%";
              }

              return (
                props.title +
                " " +
                params.value +
                s +
                (params.seriesData.length
                  ? "：" + params.seriesData[0].data + "%"
                  : "")
              );
            },
          },
        },
        axisLabel: {
          fontSize: 8,
          color: "white",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: yAxisdata,
  };

  {
    return (
      <div className={s.root}>
        <div>
          <Widget
            title={
              <h5>
                <span className="fw-semi-bold"> {props.title} </span>
              </h5>
            }
            style={{ padding: "0px" }}
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
            <ReactEchartsCore
              echarts={echarts}
              option={line}
              opts={initEchartsOptions}
              style={{ height: "300px", width: "100%" }}
            />
            <p
              style={{
                marginRight: "30px",
              }}
              class="text-right "
            >
              <img
                style={{
                  width: "20px",
                  height: "20px",
                }}
                src={image}
              />
              <b>Source: </b>Economic wolf
            </p>
          </Widget>
          {(() => {
            if (props.name === "Debt") {
              return (
                <table
                  class="rwd-table"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  <tr>
                    <th>Name</th>
                    <th>Key</th>
                  </tr>
                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#fffff"
                      />
                      Total Debt and Liabilities
                    </td>
                    <td data-th="Key">Total Debt & L</td>
                  </tr>
                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#00D01E"
                      />
                      Government Domestic Debt
                    </td>
                    <td data-th="Key">Govt Domestic Debt</td>
                  </tr>
                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#ffff00"
                      />
                      Government External Debt
                    </td>
                    <td data-th="Key">Govt Ex Debt</td>
                  </tr>
                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#E6E6FA"
                      />
                      Debt from IMF
                    </td>
                    <td data-th="Key">Debt IMF</td>
                  </tr>
                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#ff0000"
                      />
                      Privat Sector External Debt
                    </td>
                    <td data-th="Key">Private Sec Ex Debt</td>
                  </tr>

                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#9932CC"
                      />
                      PSEs External Debt
                    </td>
                    <td data-th="Key">PSEs Ex Debt</td>
                  </tr>
                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#7B68EE"
                      />
                      PSEs Domestic Debt
                    </td>
                    <td data-th="Key">PSEs Domestic Debt</td>
                  </tr>
                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#ff7bac"
                      />
                      Commodity Operations
                    </td>
                    <td data-th="Key">Commodity OP</td>
                  </tr>
                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#03d2b2"
                      />
                      Intercompany External Debt from Direct Investor abroad=
                      <span>&#62;</span>
                    </td>
                    <td data-th="Key">Intercompany Ex Debt (Aboard)</td>
                  </tr>
                  <tr>
                    <td data-th="Name">
                      <hr
                        style={{
                          marginTop: "0px",
                          marginBottom: "4px",
                          width: "5%",
                          display: "inline-block",
                          height: "3px",
                        }}
                        size="3"
                        color="#66FF66"
                      />
                      External Liabilities
                    </td>
                    <td data-th="Key">External Liabilities</td>
                  </tr>
                </table>
              );
            }
          })()}
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
