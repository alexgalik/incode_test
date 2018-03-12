const errors = ((state = [], action={}) => {
    switch(action.type) {
        case "USER_LOGGED_IN_FAILED":
            return {...action.errors};
        default: return state;
    }
 });
 
 export default errors;