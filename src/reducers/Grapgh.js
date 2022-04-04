import { GET_GRAPH_DATA } from "../actions/Graph";

export default (state=[] , action)=>{
    switch (action.type) {
        case GET_GRAPH_DATA:
            return Object.assign({}, state, {
              payload:  action.payload
              }) ;
        default:
            return state;
    }
    }