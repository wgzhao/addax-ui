import axios from "axios"
import {ref} from 'vue'

const apiPrefix = ref("/risk")

const sysRisks = () => {
    return axios.get(apiPrefix.value + '/sysRisk')
}

const fieldsChanges = () => {
    return axios.get(apiPrefix.value + '/odsFieldChange')
}

const smsDetails = () => {
    return axios.get(apiPrefix.value + '/smsDetail')
}

export default {sysRisks, fieldsChanges, smsDetails}