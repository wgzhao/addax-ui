// 采集日志
import {ref} from 'vue';
import axios from "axios";

// find all files matching the pattern
const getLogFiles = (pattern) => {
    return axios.get("/log/logFiles/" + pattern);
}
// get the content of special file
const getContent = (f) => {
    return axios.get("/log/logFileContent", {
        params: {
            f: f
        }
        });
}

export default {getLogFiles, getContent}