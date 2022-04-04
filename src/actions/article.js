import axios from 'axios'

export const GET_ARTICLE = 'GET_ARTICLE';

export const getArticle = (id) => async (dispatch) => {
    const response =  axios.get(`https://iihsan.com/api/ArticleApi/`);
    response.then((responses)=>{
  
      dispatch({ type: GET_ARTICLE, payload: responses.data });
    }).catch((err)=>{
 
    })
    
  };
  