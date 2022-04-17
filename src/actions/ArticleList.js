import axios from 'axios'

export const ARTICLE_LIST = 'ARTICLE_LIST';


export const getArticleList = (data,selected) => async (dispatch) => {
  var response=[]
  if(data && selected){
    response =  axios.get(`http://wolf.skipems.com/api/ArticleApi/?category=${data}&page=${selected}`);
    response.then((responses)=>{
  
      dispatch({ type: ARTICLE_LIST, payload: responses.data });
    }).catch((err)=>{
     
    })

  }else{
    response =  axios.get(`https://iihsan.com/api/ArticleApi/?category=${data}`);
    response.then((responses)=>{
  
      dispatch({ type: ARTICLE_LIST, payload: responses.data });
    }).catch((err)=>{
     
    })
  }
     
  
    
    
  };