// 采集监控接口
import { ref } from "vue";
import axios from "axios";

const apiPrefix = ref("/etl")

// 数据源完成情况
const fetchAccomplishList = () => {
    // fetch data via api and return 
    const d = ref([])
    axios.get(apiPrefix.value + "/accomplishList")
        .then(res => {d.value = res.data; return res.data});
        return d;
}

// 特殊任务提醒：错误、耗时过长、有重试、有拒绝行
const fetchSpecialTask = () => {
    const d = ref([])
    axios.get(apiPrefix.value + "/specialTask")
        .then(res => {d.value = res.data; return res.data});
    return d;
}

// 采集拒绝行信息

const fetchRejectTask = () => {
    const d = ref([]);
    axios.get(apiPrefix.value + "/rejectTask")
    .then(res => {d.value = res.data; return res.data});
    return d;
}

// 日间实时采集任务执行情况
const fetchRealtimeTask = () => {
    const d = ref([])
    axios.get(apiPrefix.value + "/realtimeTask")
        .then(res => { d.value = res.data; return res.data});
    return d;
}

export default {fetchAccomplishList, fetchSpecialTask, fetchRejectTask, fetchRealtimeTask}