// 采集日志
import Requests from "@/utils/requests";

// find all files matching the pattern
const getLogFiles = (pattern: string) => {
  return Requests.get("/log/logFiles/" + pattern);
};
// get the content of special file
const getContent = (f: string) => {
  return Requests.get("/log/logFileContent", {
    f: f,
  });
};

export default { getLogFiles, getContent };
