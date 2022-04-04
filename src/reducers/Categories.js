import { GET_CATEGORIES } from "../actions/Categories";
export default (state=[] , action)=>{
    switch (action.type) {
        case GET_CATEGORIES:
            return Object.assign({}, state, {
              payload:  action.payload
              }) ;
        default:
            return state;
    }
    }