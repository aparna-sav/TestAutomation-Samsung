const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const device = devices['iPhone 6'];

async function navigateToPDP() {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    await page.emulate(device);
    await page.goto('https://www.samsung.com/in/lite/smartphones/galaxy-s9?sku=SM-G960FZKD');
    await page.waitFor(5000);
    //await page.click('#app > div > div.site-wrapper.siteHeader.scrollHeight > main > div:nth-child(2) > div > div.category-product > div > div:nth-child(1) > div.category-product-image');
    //await page.waitFor(1500);
    //await page.click('#app > div > div.site-wrapper.siteHeader.scrollHeight > main > div:nth-child(2) > div > div.ProductList > div.listMode > div:nth-child(1) > div.SearchCard.data-omni-pwa-linktopdp.SearchCardList > div');
    let url = await page.url();
    const result = await page.evaluate( () => {
        var data = {};
        let Prod_Details = [];
        //let product = document.querySelector('.product-detail');
        //let Title = product.childNodes[0].children[0].innerText; //works
        let Product_Title = document.querySelector('.product-detail__sticky-header__title').innerText;
        let Start_Price = document.querySelector('.product-detail__sticky-header__cp').innerText;
        let Product_Name = document.querySelector('.product-detail__configurator_title').innerText;
        let Configurator_Code = document.querySelector('.product-detail__configurator_model-code').innerText;
        let Inclusive_Price = document.querySelector('.product-detail__configurator_price-inclusive').innerText;
        let details = document.querySelector('.product-detail__size-wrapper');
        let Color_Selected = details.childNodes[0].children[0].innerText;
        //let Storage_Selected = details.childNodes[1].children[0].innerText;
        Prod_Details.push({Product_Title, "Key_Details" : {Start_Price,Product_Name, Configurator_Code,Inclusive_Price}, "Color" : {Color_Selected}});
        return Prod_Details;
    }); 
    await browser.close();
    return result;
}

navigateToPDP().then((value) => {
    console.log(value);
});
