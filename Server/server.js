const app = require("./app");
const connect = require("./config/db");

app.listen(2345, async() => {
    await connect();
    console.log("Listening on port 2345");
})