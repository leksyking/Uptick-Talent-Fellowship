const { connect, set } = require("mongoose");

module.exports = function connectDB(url) {
    set("strictQuery", true);
    return connect(url);
};
