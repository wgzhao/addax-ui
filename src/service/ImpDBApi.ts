import { ref } from "vue";
import Requests from "@/utils/requests";

const fetchImpdbs = () => {
  const impdbs = ref([]);
  const error = ref("");

  const load = async () => {
    Requests.get("/impdb/list")
      .then((response) => {
        this.impdbs.value = response.data;
        return response;
      })
      .catch((error) => {
        error.value = "Not available at the moment";
      });
  };
  return { impdbs, error, load };
};

export default fetchImpdbs;
