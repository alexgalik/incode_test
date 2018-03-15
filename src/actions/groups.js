import {
  GROUPS_FETCHED,
  TASKS_UPDATED,
  GROUP_ADDED,
  GROUPS_UPDATED,
  GROUP_EDITED,
  GROUP_DELETED
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

const groupsUpdated = data => ({
  type: GROUPS_UPDATED,
  data
})

const groupEdited = data => ({
  type: GROUP_EDITED,
  data
})

const groupDeleted = groupId => ({
  type: GROUP_DELETED,
  groupId
})

export const fetchGroups = () => dispatch => api.groups.fetchAll().then(groups => dispatch(groupsFetched(groups)));

export const updateGroups = credentials => dispatch => api.groups.updateGroups(credentials).then(groups => dispatch(groupsUpdated(groups)));

export const updateTasks = credentials => dispatch => api.groups.updateTasks(credentials).then(group => dispatch(tasksUpdated(group)));

export const addGroup = credentials => dispatch => api.groups.addGroup(credentials).then(group => dispatch(groupAdded(group)));

export const editGroup = credentials => dispatch => api.groups.editGroup(credentials).then(group => dispatch(groupEdited(group)));

export const deleteGroup = credentials => dispatch => api.groups.deleteGroup(credentials).then(groupId => dispatch(groupDeleted(groupId)));