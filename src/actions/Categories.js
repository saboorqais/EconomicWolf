import axios from 'axios'

export const GET_CATEGORIES = 'GET_CATEGORIES';


export const getCatogeries = (data) => async (dispatch) => {
  var response=[]
  if(data){
    response =  axios.get(`http://wolf.skipems.com/api/CategoriesApi/?page=${data}`);
    response.then((responses)=>{
  
      dispatch({ type: GET_CATEGORIES, payload: responses.data.results });
    }).catch((err)=>{
     
    })

  }else{
    response =  axios.get(`https://iihsan.com/api/CategoriesApi/`);
    response.then((responses)=>{
  
      dispatch({ type: GET_CATEGORIES, payload: responses.data.results });
    }).catch((err)=>{
     
    })
  }
     
  
    
    
  };
  