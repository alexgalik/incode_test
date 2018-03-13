import {
  GROUPS_FETCHED,
  TASKS_UPDATED
} from "../types";
import api from "../api";

const groupsFetched = data => ({
  type: GROUPS_FETCHED,
  data
});

const tasksUpdated = data => ({
  type: TASKS_UPDATED,
  data
})

export const fetchGroups = () => dispatch =>
  api.groups
  .fetchAll()
  .then(groups => dispatch(groupsFetched(groups)));

export const updateGroups = credentials => dispatch => api.groups.updateGroups(credentials).then(() => console.log("Groups Updated"));

export const updateTasks = credentials => dispatch => api.groups.updateTasks(credentials).then( group => dispatch(tasksUpdated(group)));