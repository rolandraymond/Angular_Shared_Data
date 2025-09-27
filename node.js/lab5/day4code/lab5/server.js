const express = require("express");

const path = require("path");
const Router = require("./routes/users");
const jwt = require("jsonwebtoken");
const { verify } = require("crypto");
const app = express();
const port = 3000;

const logger = (req, res, next) => {
  console.log("request started");
  const auth = req.headers['authorization']
  const token = auth.split(" ")?.[1];
  jwt.verify(token, 'secretkeygfsgd', (err, data)=>{
    if(err) next(401)
  })
  console.log("logger ~ token:", token)
  
  next();
};
app.use(express.json());

app.get(["/", "/home"], async (req, res) => {
  console.log("req:", req);

  res.send({ content: "here" });
  return;
});
app.use(logger);

app.use("/users", Router);

const errorHandler = (err, req, res, next) => {
  console.log("ERROR:", err);

  if (err === 401) {
    return res.status(401).send({ error: "unauthorized" });
  }
  return res.status(400).send({ error: "something went wrong" });
};
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
