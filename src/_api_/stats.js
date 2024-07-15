/* eslint-disable */
// ----------------------------------------------------------------------
import { BASE_URL } from "../utils/constant";

const axios = require('axios');

const getStats = async () => {
  try {
    const response = await axios.get(BASE_URL + 'Stats');
    const resp = await response;
    console.log(resp.data);
    const res = [...resp.data].map((_, index) => ({
      statsId: _.statsId,
      adult: _.adult,
      car: _.car,
      fk: _.fk,
      ck: _.ck,
      aow: _.aow,
      saved: _.saved,
      offering: _.offering,
      visitors: _.visitors,
      date: _.date,
      churchId: _.churchId
    }));
    return resp?.data ?? [];
  } catch (err) {
    if (err.code == "ERR_NETWORK") return -1
  }
};
const statsArray = await getStats();

export default statsArray;
