import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://github.com/trending/javascript?since=daily");
  const repositoryDOMList = await page.$$(".Box-row");
  console.log(repositoryDOMList);
})();
