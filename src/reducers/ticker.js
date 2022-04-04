import { GET_TICKER_DATA } from "../actions/ticker";


export default (state=[] , action)=>{
    switch (action.type) {
        case GET_TICKER_DATA:
            return Object.assign([], state, {
              payload:  action.payload
              }) 
        default:
            return state;
    }
    }