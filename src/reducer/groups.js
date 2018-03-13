import { GROUPS_FETCHED, TASKS_UPDATED } from "../types";
const groups = ((state = [], action={}) => {
    switch(action.type) {
        case GROUPS_FETCHED:
            return action.data;
        case TASKS_UPDATED:
            console.log(action.data)
            state.map(group => {
                if (group.name === action.data.name) return (group.tasks = action.data.tasks)
                return group
            })
            return state;
        default: return state;
    }
 });
 
 export default groups;