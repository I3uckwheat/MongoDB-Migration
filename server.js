const mongodb = require("mongodb")
const async = require("async")
const addresses = require("./CustomerData/m3-customer-address-data.json")
const customers = require("./CustomerData/m3-customer-data.json");
const url = "mongodb://localhost:27017/customer-data"

mongodb.MongoClient.connect(url, (error, client) => {
  if(error) throw new Error(error);
  console.log("Connected to DB")
  const db = client.db("customer-data")

  const startTime = Date.now();
  customers.forEach((customer, index) => {
    db.collection("customers").insertOne({
      ...customer,
      ...addresses[index]
    }, console.log("finsihed"))
  });
  client.close();
  const endTime = Date.now() - startTime;
  console.log(endTime + "ms");
})
