import { GET_TIMELINE } from "../actions/Timeline"

export default (state=[] , action)=>{
    switch (action.type) {
        case GET_TIMELINE:
            return Object.assign({}, state, {
              payload:  action.payload
              }) ;
        default:
            return state;
    }
    }