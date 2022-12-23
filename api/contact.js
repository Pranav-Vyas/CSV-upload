const express = require("express");
const router = express.Router();
const multer = require("multer");
const csvToJson = require("csvtojson");
const Contact = require("../models/contactSchema");
const middleware = require('../middleware');

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".csv")) {
      return cb(new Error("Please upload a csv"));
    }
    cb(undefined, true);
  },
});

router.post("/upload/csv", middleware, upload.single("csvFile"), (req, res) => {
  console.log("req file ---", req.file);
  console.log('buffer',req.file.buffer);
  let str = Buffer.from(req.file.buffer, "utf8").toString("utf8");
  csvToJson()
    .fromString(str)
    .then((jsonbj) => {
      console.log("json", jsonbj);
      return Contact.insertMany(jsonbj);
    })
    .then((data) => {
      console.log("data -- ", data);
    })
    .catch((e) => {
      console.log("eror", e);
    });
  res.send();
});

module.exports = router;
