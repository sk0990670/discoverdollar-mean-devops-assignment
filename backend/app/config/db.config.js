module.exports = {
  // Use 'mongo' instead of 'localhost' when running in Docker
  url: process.env.MONGODB_URI || "mongodb://mongo:27017/discoverdollar_db"
};