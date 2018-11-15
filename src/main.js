const puppeteer = require('puppeteer');
var devices = require('./Devices.js');
var testMethod = require('./BrowserTest');
console.log("Running....\n");
var list = devices.device_list;
//console.log(list);
for (var key in list) {
    if (list.hasOwnProperty(key)) {
      var device = list[key];
      var url = 'https://www.samsung.com/in/lite/smartphones/';
      testMethod(device, url);
      console.log("\tTesting device : ",device.name);
    }
}

console.log("\nExit");