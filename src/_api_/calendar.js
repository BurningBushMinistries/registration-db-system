/* eslint-disable */

import { BASE_URL } from "../utils/constant";

// ----------------------------------------------------------------------
const axios = require('axios');

const getCalendar = async () => {
  try {
    const response = await axios.get(BASE_URL + 'Calendar');
    const resp = await response;
    console.log(resp.data);
    const res = [...resp.data].map((_, index) => ({
      id: _.id,
      name: _.name,
      time: _.time,
      month: _.month,
      year: _.yearear,
      department: _.department,
      region: _.region,
      dayFrom: _.dayFrom,
      dayTo: _.dayTo,
    }));
    return res ?? [];
  } catch (err) {
    if (err.code == "ERR_NETWORK") return -1
  }
};
const calendarArray = await getCalendar();

export default calendarArray;
