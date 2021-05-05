import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://github.com/trending/javascript?since=daily&spoken_language_code=en"
  );
  // const repositoryDOMList = await page.$$(".Box-row");
  const repositories = await page.$$eval(".Box-row", (elements) => {
    const repositories = Array.from(elements).map((element) => {
      const h1 = element.children[1];
      const title = h1?.textContent?.replace(/\s+/g, "");
      const href = `https://github.com/${title}`;

      const meta = element.children[3];
      const increaseStar = meta?.children[4]?.textContent?.trim();

      return {
        title,
        href,
        increaseStar,
      };
    });

    return repositories;
  });

  console.log(repositories);
})();
