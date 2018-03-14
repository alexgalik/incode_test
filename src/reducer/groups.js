import {
    GROUPS_FETCHED,
    TASKS_UPDATED,
    GROUP_ADDED
} from "../types";
const groups = ((state = [], action = {}) => {
    switch (action.type) {
        case GROUPS_FETCHED:
            return action.data;
        case TASKS_UPDATED:
            state.map(group => {
                if (group.groupId === action.data.groupId) return (group.tasks = action.data.tasks)
                return group
            })
            return state;
        case GROUP_ADDED:
            return [...state, action.data];
        default:
            return state;
    }
});

export default groups;