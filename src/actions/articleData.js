import axios from 'axios'

export const GET_ARTICLE_DATA = 'GET_ARTICLE_DATA';

export const getArticledata = (id) => async (dispatch) => {
    const response =  axios.get(`https://iihsan.com/api/ArticleDataApi/${id}`);
    response.then((responses)=>{
  
      dispatch({ type: GET_ARTICLE_DATA, payload: responses.data });
    }).catch((err)=>{
 
    })
    
  };
  