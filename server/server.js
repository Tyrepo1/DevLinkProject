const express = require("express");
const app = express();
const PORT_NUMBER = 9000;

app.get("/get-users", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]});
});

app.listen(PORT_NUMBER, () => {
    console.log("Server started at port " + PORT_NUMBER);
});
