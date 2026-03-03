import axios from "axios";

// Common File

export default axios.create({
    baseURL : "https://printnestuser-backend.onrender.com",
    withCredentials: true
});