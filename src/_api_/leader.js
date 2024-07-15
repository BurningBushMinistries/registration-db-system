/* eslint-disable */

import { mockImgAvatar } from '../utils/mockImages';
import { BASE_URL } from "../utils/constant";

// ----------------------------------------------------------------------
const axios = require('axios');

const getLeader = async () => {
  try {
    const response = await axios.get(BASE_URL + 'Leader');
    const resp = await response;
    console.log(resp.data);
    const res = [...resp.data].map((_, index) => ({
      leaderId: _.leaderId,
      ministry: _.ministry,
      office: _.office,
      personId: _.personId
    }));
    return res ?? [];
    if (err.code == "ERR_NETWORK") return -1
  }
};
const leaderArray = getLeader();

export default leaderArray;
