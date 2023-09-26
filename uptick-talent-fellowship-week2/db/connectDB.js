const { connect, set } = require("mongoose");

export default function connectDB(url) {
    set("strictQuery", true);
    return connect(url);
}
