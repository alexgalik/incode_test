import {
    GROUPS_FETCHED,
    TASKS_UPDATED,
    GROUP_ADDED,
    GROUPS_UPDATED,
    GROUP_EDITED,
    GROUP_DELETED
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
        case GROUP_EDITED:
            state.map(group => {
                if (group.groupId === action.data.groupId) return (group.name = action.data.name)
                return group
            })
            return state;
        case GROUP_ADDED:
            return [...state, action.data];
        case GROUP_DELETED:
            return state.filter(group => group.groupId !== action.groupId);
        case GROUPS_UPDATED:
            state.map(group => {
                action.data.map(item => {
                    if (group.groupId === item.groupId) return (group.groupIndex = item.groupIndex)
                    return group
                })
                return group
            })
            return state
        default:
            return state;
    }
});

export default groups;