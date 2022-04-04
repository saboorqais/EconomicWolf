import React, { useState } from "react";
import Charts from "../../../pages/components/charts/DailyCharts";
import "./Indicators.css";
import StackedLineChart from "../../../pages/components/charts/StackedLineChart";
import MonthlyCharts from "../../../pages/components/charts/MonthlyCharts";
import StackedHorizontal from "../../../pages/components/charts/StackedHorizontal";

export default function Indicators() {
  const [options, setoptions] = useState([1, "KSE-100"]);
  const [monthly, setmonthly] = useState([1, "Exports"]);
  const [Totalforhand, setTotalforhand] = useState(0);
  const [Total, setTotal] = useState(0);
  const [DailyIndex, setDailyIndex] = useState(0);
  const [IndexChangeDaily, setIndexChangeDaily] = useState([0, "", 0]);
  const [MonthDailyChange, setMonthDailyChange] = useState([0, "", 0]);
  const [YearDailyChange, setYearDailyChange] = useState([0, "", 0]);
  const [MonthlyChnage, setMonthlyChnage] = useState([0, "", 0]);
  const [totalbarchart, settotalbarchart] = useState(0)
  const [date, setdate] = useState("")
  const [infaltiondate, setinfaltiondate] = useState(0);
  const [datemonthly, setdateMonthly] = useState("")
  const [color, setcolor] = useState("black");
  const [YearChange, setYearChange] = useState([0, "", 0]);
  const selection = "box addon selection1  ";
  const navlink = "box addon ";

  const style1 = {
    borderTop: `12px solid ${
      MonthDailyChange[1] === "rgb(146,202,145)"
        ? "rgb(146,202,145)"
        : "rgb(224, 51, 43)"
    }`,
    borderBottom: "",
  };
  const style2 = {
    borderBottom: `12px solid ${
      MonthDailyChange[1] === "rgb(146,202,145)"
        ? "rgb(146,202,145)"
        : "rgb(224, 51, 43)"
    }`,
    borderTop:""
  };
  const style = {
    borderBottom: `12px solid ${
      IndexChangeDaily[1] === "rgb(146,202,145)"
        ? "rgb(146,202,145)"
        : "rgb(224, 51, 43)"
    }`,
  };
  function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}
  function indexValues() {
    if (monthly[0] != 8) {
      return (
        <h1
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: YearChange[1],
          }}
        >
          <div
            className={
              YearChange[1] === "rgb(146,202,145)" ? "arrow-up" : "arrow-down"
            }
            style={{
              borderColor:
                YearChange[1] === "rgb(146,202,145)"
                  ? "arrow-up"
                  : "arrow-down",
            }}
          ></div>
          {`${numberWithCommas(parseFloat(YearChange[0]))}(${YearChange[2]}%)`}
          
        </h1>
      );
    } else
      return (
        <h1 style={{ fontWeight: "bold" }}>{numberWithCommas(parseFloat(YearChange[0])) + "%"}</h1>
      );
  }
  function yearvalues() {
    if (monthly[0] != 8) {
      return (
        <h1 style={{ fontSize: "12px" }}>
          1-Year Change
          <p
            style={{
              marginTop: "5px",
              color: "#f00",
              color: YearChange[1],
            }}
          >
            <div
              className={
                YearChange[1] === "rgb(224, 51, 43)" ? "arrow-down" : "arrow-up"
              }
            ></div>
            {`${numberWithCommas(parseInt(YearChange[0]))}(${YearChange[2]}%)`}
          </p>
        </h1>
      );
    }
  }
  function MonthlyValues() {
    if (monthly[0] != 8) {
      return (
        <h1 style={{ fontSize: "12px" }}>
          1 Month change
          <p
            style={{
              marginTop: "5px",
              color: MonthlyChnage[1],
            }}
          >
            <div
              className={
                MonthlyChnage[1] === "rgb(224, 51, 43)"
                  ? "arrow-down"
                  : "arrow-up"
              }
            ></div>
            {monthly[0] != 8
              ? `${numberWithCommas(parseInt(MonthlyChnage[0]))}(${MonthlyChnage[2]}%)`
              : ""}
          </p>
        </h1>
      );
    }
  }
  function getPosition() {
    if (monthly[0] === 5 || monthly[0]===7) {
      return "PKR " + (Total ? numberWithCommas(Total)+" " : 0);
    } else if(monthly[0] === 8) {
      return (Total ? numberWithCommas(Total)  : 0) + "%";
    }
    else if(monthly[0]!=4){
      return (Total ?"$"+ numberWithCommas(Total)  : 0)   ;
    }
    else{
      return (Total ? numberWithCommas(Total)  : 0)  ;
    }
  }
  function getPosition2() {
    if (monthly[0] === 1 || monthly[0]===6||monthly[0]===2||monthly[0]===3||monthly[0]===10) {
      return "$ " + (Totalforhand ? numberWithCommas(Totalforhand)+" " : 0);
    } else if(monthly[0] === 7) {
      return (Totalforhand ?"PKR" +numberWithCommas(Totalforhand)  : 0) ;
    }

  }
  function getDelimeter(){
    if(monthly[0] === 5 ){
      return "Billion"
     
    }
    else if(monthly[0]===7){
      return  "Trillion"
   
    }
    else{
      return ""
    }
  }
  function getCharts() {
    if (monthly[0] <= 3) {
      return (
        <div>
          <StackedLineChart
            type={1}
            key={monthly[0]}
            id={monthly[0]}
            title={monthly[1]}
            total={setTotal}
            name={monthly[1]}
            MonthChange={setMonthlyChnage}
            YearChange={setYearChange}
            date={setdateMonthly}
            totalbyHand={setTotalforhand}
          />
        </div>
      );
    } else if (monthly[0] === 5 || monthly[0] === 10) {
      return (
        <StackedHorizontal
          type={1}
          key={monthly[0]}
          id={monthly[0]}
          title={monthly[1]}
          total={setTotal}
          name={monthly[1]}
          MonthChange={setMonthlyChnage}
          YearChange={setYearChange}
          date={setdateMonthly}
          totalBar={settotalbarchart}
          totalbyHand={setTotalforhand}
        />
      );
    } else {
      return (
        <MonthlyCharts
          type={1}
          key={monthly[0]}
          id={monthly[0]}
          title={monthly[1]}
          total={setTotal}
          name={monthly[1]}
          MonthChange={setMonthlyChnage}
          YearChange={setYearChange}
          date={setdateMonthly}
          totalBar={settotalbarchart}
          s={setinfaltiondate}
          totalbyHand={setTotalforhand}
          
        />
      );
    }
  }
  function getCurrencyDaily() {
    if (options[0] != 1) {
      return "PKR";
    } else {
      return "";
    }
  }

  return (
    <div className="helperformargin" style={{ backgroundColor: "black" }}>
      <div className="">
        <h3 className="h1 m-3" style={{ fontWeight: "bold" }}>
          MP DAILY
        </h3>

        <div className="d-flex ml-2 mr-3 mb-3 text-white">
          <a
            className={
              options[0] === 1
                ? "selection p-2 m-2 bg-outline-secondary"
                : "nav-link p-2 m-2 bg-outline-secondary"
            }
            onClick={() => {
              setoptions([1, "KSE-100"]);
            }}
          >
            KSE-100
          </a>
          <a
            className={
              options[0] === 3
                ? "selection p-2 m-2 bg-outline-secondary"
                : "nav-link p-2 m-2 bg-outline-secondary"
            }
            onClick={() => {
              setoptions([3, "Gold"]);
            }}
          >
            GOLD
          </a>
          <a
            className={
              options[0] === 2
                ? "selection p-2 m-2 bg-outline-secondary"
                : "nav-link p-2 m-2 bg-outline-secondary"
            }
            onClick={() => {
              setoptions([2, "PKR/USD"]);
            }}
          >
            PKR/USD
          </a>
        </div>

        <div className="row" style={{marginRight:"0px",marginLeft:"0px"}}>
          <div className="col-lg-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h1 style={{ fontWeight: "bold" }}>
                    {}
                    {DailyIndex ? getCurrencyDaily() + " " +numberWithCommas(DailyIndex)  : 0}
                  </h1>
                  <p>{date}</p>
                </div>
                <div className="col-lg-6">
                  <h1
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: IndexChangeDaily[1],
                      marginTop:"10px"
                    }}
                  >
                    <div
                      className={
                        IndexChangeDaily[1] === "rgb(146,202,145)"
                          ? "arrow-up"
                          : "arrow-down"
                      }
                      style={
                        IndexChangeDaily[1] === "rgb(146,202,145)" ? style : {}
                        
                      }
                    ></div>

                    {`${parseInt(IndexChangeDaily[0])}(${
                      IndexChangeDaily[2]
                    }%)`}
                  </h1>
                </div>
              </div>

              <hr style={{ background: "white", height: "2px" }} />
              <div className="row">
                <div className="col-lg-12">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, ook. It has
                    survived not only five centuries
                  </p>
                </div>
              </div>
              <hr style={{ background: "white", height: "2px" }} />
            </div>
            <div className="row m-3 mt-5">
              <div className="col-lg-4">
                <h1 style={{ fontSize: "12px" }}>
                  1-Year Change
                  <p style={{ marginTop: "5px", color: YearDailyChange[1] }}>
                    <div
                      className={
                        YearDailyChange[1] === "rgb(146,202,145)"
                          ? "arrow-up"
                          : "arrow-down"
                      }
                     
                    ></div>
                    {`${parseInt(YearDailyChange[0])}(${YearDailyChange[2]}%)`}
                  </p>
                </h1>
              </div>
              <div className="col-lg-4"></div>
              <div className="col-lg-4">
                <h1 style={{ fontSize: "12px" }}>
                  1 Month change
                  <p style={{ marginTop: "5px", color: MonthDailyChange[1] }}>
                    <div
                      className={
                        MonthDailyChange[1] === "rgb(146,202,145)"
                          ? "arrow-up"
                          : "arrow-down"
                      }
                     
                    ></div>
                    {`${parseInt(MonthDailyChange[0])}(${
                      MonthDailyChange[2]
                    }%)`}
                  </p>
                </h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6" style={{ margin: "5px" }}>
            <Charts
              id={options[0]}
              title={options[1]}
              index={setDailyIndex}
              indexChange={setIndexChangeDaily}
              MonthChange={setMonthDailyChange}
              yearChange={setYearDailyChange}
              colorLabel={1}
              date={setdate}
            />
          </div>
        </div>
      </div>

      <div className="">
        <h3 className="h1 m-3" style={{ fontWeight: "bold" }}>
          MP MONTH
        </h3>
        <div className="serv">
          <ul style={{ margin: "20px" }}>
            <li
              style={{
                color: monthly[0] === 1 ? color : "white",
              }}
              className={monthly[0] === 1 ? selection : navlink}
              onClick={() => {
                setmonthly([1, "Exports"]);
              }}
            >
              EXPORTS
            </li>
            <li
              style={{
                color: monthly[0] === 2 ? color : "white",
              }}
              className={monthly[0] === 2 ? selection : navlink}
              onClick={() => {
                setmonthly([2, "Imports"]);
              }}
            >
              IMPORTS
            </li>
            <li
              style={{
                color: monthly[0] === 3 ? color : "white",
              }}
              className={monthly[0] === 3 ? selection : navlink}
              onClick={() => {
                setmonthly([3, "Remittances"]);
              }}
            >
              REMITTANCES
            </li>
            <li
              style={{
                color: monthly[0] === 4 ? color : "white",
              }}
              className={monthly[0] === 4 ? selection : navlink}
              onClick={() => {
                setmonthly([4, "LSM"]);
              }}
            >
              LSM
            </li>
            <li
              style={{
                color: monthly[0] === 5 ? color : "white",
              }}
              className={monthly[0] === 5 ? selection : navlink}
              onClick={() => {
                setmonthly([5, "Tax"]);
              }}
            >
              TAX
            </li>
            <li
              style={{
                color: monthly[0] === 7 ? color : "white",
                fontWeight: "bold",
                padding: "10px",
              }}
              className={monthly[0] === 7 ? selection : navlink}
              onClick={() => {
                setmonthly([7, "Debt"]);
              }}
            >
              DEBT
            </li>
            <li
              style={{
                color: monthly[0] === 6 ? color : "white",
                fontWeight: "bold",
              }}
              className={monthly[0] == 6 ? selection : navlink}
              onClick={() => {
                setmonthly([6, "Current Account"]);
              }}
            >
              CURRENT ACCOUNT
            </li>
            <li
              style={{
                color: monthly[0] === 9 ? color : "white",
                fontWeight: "bold",
                padding: "10px",
              }}
              className={monthly[0] === 9 ? selection : navlink}
              onClick={() => {
                setmonthly([9, "FX"]);
              }}
            >
              FOREIGN EXCHANGE
            </li>
            <li
              style={{
                color: monthly[0] === 10 ? color : "white",
              }}
              className={monthly[0] === 10 ? selection : navlink}
              onClick={() => {
                setmonthly([10, "Investment"]);
              }}
            >
              INVESTMENT
            </li>
            <li
              style={{
                color: monthly[0] === 8 ? color : "white",
              }}
              className={monthly[0] === 8 ? selection : navlink}
              onClick={() => {
                setmonthly([8, "Inflation"]);
              }}
            >
              INFLATION
            </li>
          </ul>
        </div>

        <div className="row py-5"
        style={{marginRight:"0px",marginLeft:"0px"}}
        >
          <div className="col-lg-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <h1 style={{ fontWeight: "bold", display: "flex" }}>
                    {getPosition()}
                    {getDelimeter()}
                  
                  </h1>
                  <p>{datemonthly}</p>
                </div>
                <div style={monthly[0]===8?{}:{marginTop:"10px"}} className="col-lg-6">{indexValues()}
                {monthly[0]===8?<p>{infaltiondate}</p>:<p></p>}
                </div>
                {(() => {
                  if (monthly[0] === 1 ||monthly[0] === 2||monthly[0] === 3||monthly[0] === 7||monthly[0] === 6||monthly[0] === 10) {
                    if(typeof(Totalforhand)==="object"){
                      console.log(Totalforhand)
                     }
                    return (
                  <p style={{ fontWeight: "bold", fontSize: "30px" }}
                   class="col-lg-8">
                   Total:{" "+getPosition2()+" "}{getDelimeter()}
                  
                  </p>
                    );
                  }
                })()} 
               
              </div>
              <hr style={{ background: "white", height: "2px" }} />
              <div className="row">
                <div className="col-lg-12">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, ook. It has
                    survived not only five centuries
                  </p>
                </div>
              </div>
              <hr style={{ background: "white", height: "2px" }} />
            </div>
            <div className="row m-3 mt-5">
              <div className="col-lg-4">{yearvalues()}
              </div>
              <div className="col-lg-4"></div>
              <div className="col-lg-4">{MonthlyValues()}</div>
            </div>
          </div>
          <div className="col-lg-6" style={{ margin: "5px" ,padding:"0px"}}>
            {getCharts()}
           
          </div>
        </div>
      </div>
    </div>
  );
}
