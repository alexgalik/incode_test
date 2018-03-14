import axios from "axios";

export default {
    user: {
        login: user =>
            axios.post("/api/users", {
                user
            }).then(res => res.data),
        fetchCurrentUser: () =>
            axios.get("/api/users/current_user").then(res => res.data.user)
    },
    groups: {
        fetchAll: () => axios.get("/api/groups").then(res => res.data.groups),
        updateGroups: groups =>
            axios.post("/api/groups/update-groups", {
                groups
            }).then(res => res.data.groups),
        updateTasks: newTask =>
            axios.post("/api/groups/update-tasks", {newTask}).then(res => res.data.task),
        addGroup: group =>
            axios.post("/api/groups/new-group", {group}).then(res => res.data.group)
    }
};