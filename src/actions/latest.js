import BaseAPI from "./BaseAPI";


export const GET_LATEST = 'GET_LATEST';


export const getLatest = (data) => async (dispatch) => {
 var response=[]
  if(data){

     response = await BaseAPI.get(`http://wolf.skipems.com/api/LatestArticleApi/?page=${data+1}`);
     console.log(response)
  }
  else{
     response = await BaseAPI.get("http://wolf.skipems.com/api/LatestArticleApi/");
  }
   
    dispatch({ type: GET_LATEST, payload: response.data.results });
  };
  