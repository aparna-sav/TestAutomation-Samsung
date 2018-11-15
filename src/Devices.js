const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
let device_list = [];
device_list.push(devices['iPhone 6']);
device_list.push(devices['iPhone X']);
module.exports =  {
    device_list
};


