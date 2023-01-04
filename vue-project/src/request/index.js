import axios from 'axios'

let service = axios.create({
    baseURL: "http://localhost:8686",
    timeout: 6000
})
export default service