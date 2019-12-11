const mongoose = require("mongoose");

class Database {
  constructor() {
    this.uri = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017"
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "loancompare",
    };

    this._connect();
  }

  _connect() {
    mongoose.connect(this.uri, this.options);
    console.log("Database connection successful");
  }

  closeConnection() {
    return new Promise((resolve, reject) => {
      try {
        mongoose.connection.close(() => {
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = new Database();