import { GET_LATEST } from "../actions/latest";


export default (state=[] , action)=>{
    switch (action.type) {
        case GET_LATEST:
            return Object.assign([], state, {
              payload:  action.payload
              }) ;
        default:
            return state;
    }
    }