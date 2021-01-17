require('dotenv').config();
const envVars = process.env;
module.exports = {
    port: envVars.PORT,
    env: envVars.NODE_ENV,
    mongo: {
        mongo_uri: envVars.MONGODB_URI,
        mongo_port: envVars.MONGO_PORT,
        isDebug: envVars.MONGOOSE_DEBUG
    },
    jwtSecretKey: envVars.JWT_SECRET_KEY
};