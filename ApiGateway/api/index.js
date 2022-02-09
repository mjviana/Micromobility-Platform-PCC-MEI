const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const proxy = require("express-http-proxy");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ENABLE CORS
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization"
  ); // 'Content-Type');
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  next();
});

// Call Authentication Service
app.use(
  "/users",
  proxy("http://authenticationservice:5000", {
    proxyReqPathResolver: function (req) {
      console.log("/users" + req.url);
      return "/users" + req.url;
    },
  })
);

// Call Vehicle Management Service
app.use(
  "/vehicles",
  proxy("http://vehicles_service:80", {
    proxyReqPathResolver: function (req) {
      console.log("/vehicles" + req.url);
      return "/vehicles" + req.url;
    },
  })
);

// Call Trips Service
app.use(
  "/Trips",
  proxy("http://trips_service:6000", {
    proxyReqPathResolver: function (req) {
      console.log("/Trips" + req.url);
      return "/Trips" + req.url;
    },
  })
);

//Listen API
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("API GATEWAY LISTENING ON PORT:" + port);
});
