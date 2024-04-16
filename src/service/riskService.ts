import {ref} from 'vue'
import {requests} from '@/utils/requests'

const apiPrefix = ref("/risk")

const sysRisks = () => {
    return requests.get(apiPrefix.value + '/sysRisk')
}

const fieldsChanges = () => {
    return requests.get(apiPrefix.value + '/odsFieldChange')
}

const smsDetails = () => {
    return requests.get(apiPrefix.value + '/smsDetail')
}

export default {sysRisks, fieldsChanges, smsDetails}