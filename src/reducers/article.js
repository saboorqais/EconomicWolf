import { GET_ARTICLE } from "../actions/article";




export default (state=[] , action)=>{
    switch (action.type) {
        case GET_ARTICLE:
            return Object.assign([], state, {
              payload:  action.payload
              }) ;
        default:
            return state;
    }
    }