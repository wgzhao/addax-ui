import Requests from "@/utils/requests";

const sysRisks = () => {
    return requests
        .get("/risk/sysRisk")
        .then((res) => res.json())
        .then((res) => {
            return res;
        });
    // return get('/risk/sysRisk', {'a': 'b'}).value
};

const addaxLog = () => {
    return Requests.post("/log/logFileContent", { f: "aaa.log" });
};

const calc = (a, b) => {
    return a + b;
};

export default { calc, sysRisks, addaxLog };
