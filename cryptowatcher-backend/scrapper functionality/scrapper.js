const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const errorHandler = require("../utils/errorHandler");

async function calculateOperationTime(startTime) {
    const endTime = new Date();
    const operationTime = endTime - startTime;
    console.log('Total operation time:', operationTime, 'milliseconds');
}


async function fetchPage() {
    try {
        const startTime = new Date();
        const url = 'https://coinmarketcap.com/';
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw errorHandler(500, "Error fetching page: " + error.message);
    }
}

async function scrapeData(html) {
    try {
        const startTime = new Date();
        const $ = cheerio.load(html);
        const tableRows = $('#__next > div.sc-faa5ca00-1.cKgcaj.global-layout-v2 > div.main-content > div.cmc-body-wrapper > div > div > div.sc-66133f36-2.cgmess > table > tbody > tr');
        const resultArray = [];
        tableRows.each((parentIdx, parentEle) => {
            const rowData = {};
            $(parentEle).children().each((childIdx, childEle) => {
                const tdValue = $(childEle).text();
                const columnHeader = $(`th:nth-child(${childIdx + 1})`).text();
                rowData[columnHeader] = tdValue.trim();
            });
            resultArray.push(rowData);
        });
        return resultArray;
    } catch (error) {
        throw errorHandler(500, "Error scraping data: " + error.message);
    }
}

async function saveAsJSON(data) {
    try {
        const dataFolderPath = path.join(__dirname, '..', 'data');
        if (!fs.existsSync(dataFolderPath)) {
            fs.mkdirSync(dataFolderPath);
        }
        const filePath = path.join(dataFolderPath, 'marketCapData.json');
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        throw errorHandler(500, "Error saving data as JSON: " + error.message);
    }
}

async function getSingleCoin(coinName) {
    const startTime = new Date();
    const filePath = path.join(__dirname, '..', 'data', 'marketCapData.json');
  
    try {
      const data = await fsPromise.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      const coinData = jsonData.find((coin) => coin.Name === coinName);
  
      if (coinData) {
        return coinData;
      } else {
        throw errorHandler(404, `Coin '${coinName}' not found.`);
      }
    } catch (error) {
      throw errorHandler(500, `Error reading/parsing the file: ${error.message}`);
    } finally {
      await calculateOperationTime(startTime);
    }
  }

async function scrapper() {
    const startTime = new Date();
    try {
        const pageContent = await fetchPage();
        const scrapedData = await scrapeData(pageContent);
        await saveAsJSON(scrapedData);
        return scrapedData;
    } catch (error) {
        throw errorHandler(500, "Scraping failed: " + error.message);
    } finally {
        await calculateOperationTime(startTime);
    }
}

module.exports = { scrapper, getSingleCoin };
