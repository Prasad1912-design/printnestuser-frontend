import axios from "axios";

// Common File

export default axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});