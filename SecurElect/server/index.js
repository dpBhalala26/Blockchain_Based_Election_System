const app = require('./config/express');
const config = require('./config/config');

// Initialize mongoDB via mongoose
require('./config/mongoose');

// Listen to the port
app.listen(config.port, () => {
    console.log(`Server started on PORT number ${config.port} in ${config.env} Environment.`);
});

