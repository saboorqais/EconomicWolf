import axios from 'axios'

export const SET_CONTACT_DATA = 'SET_CONTACT_DATA';


export const setContact = (data) => async (dispatch) => {
    const response =  axios.post("http://wolf.skipems.com/api/ContactUs/",data);
    response.then((responses)=>{
      
      dispatch({ type: SET_CONTACT_DATA, payload: responses.data });
    }).catch((err)=>{
        console.log("error")
    })
  
    
    
  };
  