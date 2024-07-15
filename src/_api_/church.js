/* eslint-disable */

// ----------------------------------------------------------------------
const axios = require('axios');
import { BASE_URL } from "../utils/constant";



const getChurch = async () => {
  try {
    const response = await axios.get(BASE_URL + 'Church');
    const resp = await response;
    console.log(resp.data);
    const res = [...resp.data].map((_, index) => ({
      churchId: _.churchId,
      churchName: _.churchName,
      location: _.location,
      branch: _.branch,
      province: _.province,
      city: _.city,
      region: _.region,
      pastorId: _.pastorId
    }));
    return resp?.data ?? [];
  } catch (err) {
    if (err.code == "ERR_NETWORK") return -1
  }
};
const churchArray = await getChurch();

export default churchArray;
