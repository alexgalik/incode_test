import {
  GROUPS_FETCHED,
  TASKS_UPDATED,
  GROUP_ADDED
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

const groupAdded = data => ({
  type: GROUP_ADDED,
  data
})

export const fetchGroups = () => dispatch =>
  api.groups
  .fetchAll()
  .then(groups => dispatch(groupsFetched(groups)));

export const updateGroups = credentials => dispatch => api.groups.updateGroups(credentials).then(groups => dispatch(groupsFetched(groups)));

export const updateTasks = credentials => dispatch => api.groups.updateTasks(credentials).then( group => dispatch(tasksUpdated(group)));

export const addGroup = credentials => dispatch => api.groups.addGroup(credentials).then(group => dispatch(groupAdded(group)));