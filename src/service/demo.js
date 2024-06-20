import {get, post} from '@/utils/request'

const sysRisks =  () => {
    return fetch('http://localhost:5001/risk/sysRisk').then(res => res.json()).then(res => {return res});
    // return get('/risk/sysRisk', {'a': 'b'}).value
}

const addaxLog = () => {
    return post('/log/logFileContent', {f: 'aaa.log'})
}

const calc = (a, b) => {
    return a + b;
}

export default {calc, sysRisks, addaxLog}

