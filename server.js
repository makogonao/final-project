const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
require("./middleware/passport")(passport);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

const routes = require("./settings/routes");
routes(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
    console.log(`run server on port: ${port}!`);
});
