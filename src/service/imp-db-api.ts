import { ref } from 'vue'
import Requests from '@/utils/requests'

const fetchImpdbs = () => {
  const impdbs = ref([])
  const error = ref('')

  const load = async () => {
    try {
      const response = await Requests.get('/impdb/list')
      impdbs.value = response as any[]
    } catch (err) {
      error.value = 'Not available at the moment'
      console.error(err)
    }
  }
  return { impdbs, error, load }
}

export default fetchImpdbs
