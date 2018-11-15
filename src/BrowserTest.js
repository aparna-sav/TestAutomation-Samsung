const puppeteer = require('puppeteer');
var fs = require('fs');
var dir = '../Screenshots/';
module.exports = async function (device,url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    var curr_dir = dir+device.name;
    if(!fs.existsSync(curr_dir)){
        fs.mkdirSync(curr_dir);
    }
    await page.emulate(device);
    await page.goto(url);
    await page.waitFor(5000);
    await page.screenshot({path: curr_dir+'/Producthome.png'});
    await browser.close();
};


