/* eslint-disable */

// ----------------------------------------------------------------------
import { BASE_URL } from "../utils/constant";

const axios = require('axios');


var userObject = {
  name: 'string',
  username: 'string',
  email: 'string',
  comments: 'string',
  churchId: 0,
  tagID: 'string',
  gender: 'string',
  contactNumber: 'string',
  address: 'string',
  maritalStatus: 'string',
  cellLeader: 'string',
  cellLocation: 'string',
  ministry: 'string',
  church: 'string',
  region: 'string',
  seedContribution: 'int',
  regContribution: 'int',
  amount: 'int'
};

const addUsers = async ({ userObject }) => {
  try {
    const response = await axios.post(BASE_URL + 'Person', { userObject });

    // var sql = `INSERT INTO UserTbl
    // (tenantID, lastName, firstName, email, occupation, online, tagID, hours, temperature, gender, ethnicity, accessType, status, username, password, biometricID, faceID) VALUES
    // (${userObject.tenantID}, '${userObject.lastName}', '${userObject.firstName}', '${userObject.email}', '${userObject.occupation}', ${userObject.online}, '${userObject.tagID}', '${defaultZero}', ${defaultZero}, '${userObject.gender}', '${userObject.ethnicity}', ${defaultZero}, ${defaultZero}, '${userObject.username}', '${userObject.password}', '${userObject.biometricID}',' ${userObject.faceID}') `;
  } catch (err) {
    if (err.code == "ERR_NETWORK") return -1
  }
};
const userArray = addUsers({ userObject });

export default userArray;
