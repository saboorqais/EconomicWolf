import { GET_ARTICLE_DATA } from "../actions/articleData";

export default (state=[] , action)=>{
    switch (action.type) {
        case GET_ARTICLE_DATA:
            return Object.assign([], state, {
              payload:  action.payload
              }) ;
        default:
            return state;
    }
    }