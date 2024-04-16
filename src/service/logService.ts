// 采集日志
import {requests} from '@/utils/requests'

// find all files matching the pattern
const getLogFiles = (pattern: string) => {
    return requests.get("/log/logFiles/" + pattern);
}
// get the content of special file
const getContent = (f) => {
    return requests.get("/log/logFileContent", {
        params: {
            f: f
        }
        });
}

export default {getLogFiles, getContent}