// capture.js
import fs from "fs";
import puppeteer from "puppeteer";

const urls = fs.readFileSync("./urls.txt", "utf-8").trim().split("\n");

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
  hero: { width: 1400, height: 700, deviceScaleFactor: 2 },
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  for (const url of urls) {
    const clean = url.replace(/https?:\/\//, "").replace(/[\/:]/g, "_");
    console.log(`📸 Capturando ${url}`);

    // Carrega página
    await page.setViewport(VIEWPORTS.desktop);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    // Remove barras de rolagem e popups visuais
    await page.evaluate(() => {
      document.querySelectorAll("iframe, .cookie, .popup, .chat, .banner").forEach(e => e.remove());
      document.body.style.overflow = "hidden";
    });

    // FULL PAGE
    await page.screenshot({
      path: `./output/${clean}_full.webp`,
      fullPage: true,
      type: "webp",
      quality: 80,
    });

    // HERO (top crop)
    await page.setViewport(VIEWPORTS.hero);
    await page.screenshot({
      path: `./output/${clean}_hero.webp`,
      clip: { x: 0, y: 0, width: 1400, height: 700 },
      type: "webp",
      quality: 80,
    });
  }

  await browser.close();
  console.log("✅ Capturas concluídas!");
})();
