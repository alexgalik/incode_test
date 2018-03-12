import axios from "axios";

export default {
    user: {
        login: user =>
            axios.post("/api/users", {
                user
            }).then(res => res.data),
        fetchCurrentUser: () =>
            axios.get("/api/users/current_user").then(res => res.data.user)
    }
};