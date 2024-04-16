import { ref } from 'vue'
import {requests} from '@/utils/requests'

const fetchImpdbs = ()  => {
    const impdbs = ref([])
    const error = ref('')

    const load = async () => {
        requests.get('/impdb/list')
            .then(response => {
                this.impdbs.value = response.data
                return response
            }
                )
            .catch(error => {
                error.value = 'Not available at the moment';
            })
    }
    return { impdbs, error, load }
}

export default fetchImpdbs