import puppeteer from "puppeteer";

const TRENDINGS = [
  "https://github.com/trending/javascript?since=daily&spoken_language_code=en",
  "https://github.com/trending/typescript?since=daily&spoken_language_code=en",
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const allRepository = [];
  for (const url of TRENDINGS) {
    await page.goto(url);

    const repositories = await page.$$eval(".Box-row", (elements) => {
      const repositories = Array.from(elements).map((element) => {
        const h1 = element.children[1];
        const title = h1?.textContent?.replace(/\s+/g, "");
        const href = `https://github.com/${title}`;

        const meta = element.children[element.children.length - 1];
        const increaseStar = Number(
          meta?.children[4]?.textContent?.trim()?.replace(" stars today", "")
        );

        return {
          title,
          href,
          increaseStar,
        };
      });

      return repositories;
    });

    allRepository.push(repositories);
  }

  console.log(allRepository);
})();
