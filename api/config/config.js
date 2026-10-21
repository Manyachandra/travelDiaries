let config = {
    MONGO_URL: process.env.MONGO_URL,
    // SECRET_KEY is no longer read from config.js; it is provided via the
    // api/.env file (see api/.env.example) and consumed by the auth layer
    // through JWT_SECRET.
};

module.exports = config;
