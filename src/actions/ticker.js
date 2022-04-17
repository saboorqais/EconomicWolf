import axios from "axios";



export const GET_TICKER_DATA = 'GET_TICKER_DATA';


export const getTickerData = () => async (dispatch) => {
  const response =  axios.get("http://wolf.skipems.com/api/Ticker");
  response.then((responses)=>{
   
    dispatch({ type: GET_TICKER_DATA, payload: responses.data });
  }).catch((err)=>{
  
  })
  }
