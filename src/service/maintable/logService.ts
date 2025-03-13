// 采集日志
import Requests from "@/utils/requests";

// find all files matching the pattern
const getLogFiles = (tableName: string, spName: string) => {
  return Requests.get("/log/logFiles" , {
    tableName: tableName,
    spName: spName
    });
};
// get the content of special file
const getContent = (f: string) => {
  return Requests.get("/log/logFileContent", {
    f: f
  });
};

export default { getLogFiles, getContent };
