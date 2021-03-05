require('dotenv').config();
const envVars = process.env;
module.exports = {
    web3HttpProvider: envVars.WEB3_HTTP_PROVIDER
};