const puppeteer = require('puppeteer');
var fs = require('fs');
var dir = '../Screenshots/';
module.exports = async function (device,url,skuId) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    var curr_dir = dir+device.name;
    if(!fs.existsSync(curr_dir)){
        fs.mkdirSync(curr_dir);
    }
    await page.emulate(device);
    // NAVIGATE WITH SKU'S
    await page.goto(url+skuId);
    await page.waitFor(15000);
    await page.screenshot({path: curr_dir+'/'+skuId+'.png'});
    //Getting key details 
/*
    let Prod_Details = [];
    let product = document.querySelector('.product-detail');
    //let Title = product.innerText;
    console.log(product);
*/  
    /* NAVIGATE WITH CLICKS
    await page.goto(url);
    await page.waitFor(5000);
    await page.screenshot({path: curr_dir+'/Producthome.png'});
    await page.waitForSelector('#app > div > div.site-wrapper.siteHeader.scrollHeight > main > div:nth-child(2) > div > div.category-product > div > div:nth-child(1)');
    await page.click('#app > div > div.site-wrapper.siteHeader.scrollHeight > main > div:nth-child(2) > div > div.category-product > div > div:nth-child(1)');
    await page.waitForSelector('#app > div > div.site-wrapper.siteHeader.scrollHeight > main > div:nth-child(2) > div > div.ProductList > div.listMode > div:nth-child(1) > div.SearchCard.data-omni-pwa-linktopdp.SearchCardList > div > div.SearchCard__container_left');
    await page.screenshot({path : curr_dir+'/GalaxyS.png'});
    await page.click('#app > div > div.site-wrapper.siteHeader.scrollHeight > main > div:nth-child(2) > div > div.ProductList > div.listMode > div:nth-child(1) > div.SearchCard.data-omni-pwa-linktopdp.SearchCardList > div > div.SearchCard__container_left');
    await page.waitFor(5000);
    await page.screenshot({path : curr_dir+'/GalaxyS9.png'});
    */
    await browser.close();
    
};


