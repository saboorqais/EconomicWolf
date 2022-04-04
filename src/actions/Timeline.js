
import axios from 'axios'


export const GET_TIMELINE = 'GET_TIMELINE';


export const getTimelineData = () => async (dispatch) => {
    const response =  axios.get("https://iihsan.com/api/TimelineApi/");
    response.then((value)=>{
      dispatch({ type: GET_TIMELINE, payload: value.data });
    })
   
  };
  