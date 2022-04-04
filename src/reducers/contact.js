import { SET_CONTACT_DATA } from "../actions/contact";


export default (state=[] , action)=>{
    switch (action.type) {
        case SET_CONTACT_DATA:
            return Object.assign([], state, {
              payload:  action.payload
              }) ;
        default:
            return state;
    }
    }