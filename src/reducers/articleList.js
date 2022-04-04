import { ARTICLE_LIST } from "../actions/ArticleList";






export default (state=[] , action)=>{
    switch (action.type) {
        case ARTICLE_LIST:
            return Object.assign([], state, {
              payload:  action.payload
              }) ;
        default:
            return state;
    }
    }