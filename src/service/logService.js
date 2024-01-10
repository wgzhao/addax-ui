// 采集日志
import {ref} from 'vue';
import axios from "axios";

// find all files matching the pattern
const getLogFiles = (pattern) => {
    const d = ref([]);
    axios.get("/log/logFiles/" + pattern)
        .then(res => {d.value = res.data; return res.data});
    return d;
}
// get the content of special file
const getContent = (f) => {
    const d = ref([]);
    axios.get("/log/logFileContent", {
        params: {
            f: f
        }
        })
        .then(res => { d.value = res.data; return res.data; });
    return d;
}

export default {getLogFiles, getContent}