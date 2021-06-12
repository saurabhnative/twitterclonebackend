const express = require("express");
const router = express.Router();
const db = require("../config/dbconfig");
const orderBy = require("lodash/orderBy");
router.post("/add", function (request, response) {
  console.log("data recieved from client", request.body);
  const options = {
    // schema is not passed here since it has been passed while creating client
    table: "tweets",
    records: [request.body],
  };
  db.insert(options, (err, res) => {
    if (err) {
      console.log("error in insert operation", err);
      response.status(500).send({ error: err });
    } else {
      console.log(res);
      response.send({ result: "Tweet added successfully" });
    }
  });
});

router.get("/getAll", function (request, response) {
  const options = {
    // schema is not passed here since it has been passed while creating client
    table: "tweets",
    searchAttribute: "userHandle",
    searchValue: "*",
    attributes: ["*"],
  };
  db.searchByValue(options, (err, res) => {
    if (err) {
      console.log("error occured while fetching data", err);
      response.status(500).send({ Error: err });
    } else {
      console.log("result", res);
      const tweetsData = res.data;
      const sortedTweets = orderBy(tweetsData, ["__createdtime__"], ["desc"]);
      response.send({ results: sortedTweets });
    }
  });
});

module.exports = router;
