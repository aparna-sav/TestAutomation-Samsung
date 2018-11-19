const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const device = devices['iPhone 6'];
const Pages = require('./Config/Pages.json');
const RunData = require('./Config/Iterators.json')
const Locator = require('./Config/Locators.json');


async function crawlPDP() {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.emulate(device);
    var URL = '';
    for(var i in RunData){
        for(var p in Pages){
            if ( Pages[p]["PageId"] == RunData[i]["PageId"]){
                URL = Pages[p]["PageURL"];
            }
        }
        for ( var mykeys in RunData[i]["Params"]){
            var rx = "<<"+mykeys+">>";
            if(mykeys == 'Product-Family'){
                if(URL.indexOf(rx)>=0)
                    URL = URL.replace(rx,RunData[i]["Params"][mykeys]);
                else{
                    console.log("Problem with the URL.Exiting....")
                    return "Exit";
                }		
            } 
            else if(mykeys == 'Product-sku'){
                for(var sku in RunData[i]["Params"][mykeys]){
                    if(URL.indexOf(rx)>=0)
                        var new_URL = URL.replace(rx,RunData[i]["Params"][mykeys][sku]);
                    else{
                        console.log("Problem with the URL.Exiting....")
                        return "Exit";
                    }
                    console.log("Scraping URL : "+new_URL);
                    await page.goto(new_URL, {timeout: 500000});
                    await console.log("Page loaded");
                    await page.on('console', consoleObj => console.log(consoleObj.text()));
                    let data = {};
                    for ( var z in Locator){
                        if ( Locator[z]["PageId"] == RunData[i]["PageId"]){
                            data["PageId"] = RunData[i]["PageId"];
                            data["Params"] = RunData[i]["Params"];
                            for (var locate in Locator[z]["resource_locators"]){
                                if ( Locator[z]["resource_locators"][locate]["type"] == 'Label' ){
                                    let title = Locator[z]["resource_locators"][locate]["title"];
                                    let cName = Locator[z]["resource_locators"][locate]["class"];
                                    //console.log(title,cName);
                                    data[title]=await page.evaluate(name => {
                                        //console.log(name);
                                        let res = document.querySelector(name).innerText;
                                        return res;
                                    }, cName);
                                    console.log(data);
                                }
                            }
                        }
                    }        
                }
            }
        }
        //console.log(URL);
    }
    await browser.close();
    return "end";
}

crawlPDP().then((value) => {
    console.log(value);
});


