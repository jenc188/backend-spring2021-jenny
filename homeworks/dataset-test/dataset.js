const {performance} = require('perf_hooks');
let t0 = performance.now();
const fs = require("fs");
const dsFunctions = require("./dataset-functions.js");
let objectArray = [];

if (fs.existsSync("dataset.json")) {
    let jsonSave = fs.readFileSync("dataset.json", "utf-8");
    let convertedObject = JSON.parse(jsonSave);