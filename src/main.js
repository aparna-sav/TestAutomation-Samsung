const puppeteer = require('puppeteer');
var devices = require('./Devices.js');
var testMethod = require('./BrowserTest');
var skuList = require('./sku');

console.log("Running....\n");
var list = devices.device_list;
for (var key in list) {
    if (list.hasOwnProperty(key)) {
      var device = list[key];
      console.log("\n\tTesting device : ",device.name);
      var url = 'https://www.samsung.com/in/lite/smartphones/galaxy-s9?sku=';
      var skus = skuList.skus;
      for (var i in skus){
        var sku = skus[i];
        console.log("\t\tSku : ",sku.id);
        var title = testMethod(device, url,sku.id);
      }
    }
}

console.log("\nExit");