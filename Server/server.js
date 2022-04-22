const app = require("./app");
const connect = require("./config/db");

app.listen(3000, async() => {
    await connect();
    console.log("Listening on port 3000");
})