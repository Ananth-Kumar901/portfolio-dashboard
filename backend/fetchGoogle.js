const axios = require('axios');
const cheerio = require('cheerio');

async function getGoogleFinanceData(symbol) {
  try {
    const url = `https://www.google.com/finance/quote/${symbol}:NSE`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Example selectors (may need adjustment)
    const peRatio = $('div:contains("P/E ratio")').next().text();
    const earnings = $('div:contains("Earnings")').next().text();

    return {
      peRatio: parseFloat(peRatio) || null,
      earnings: parseFloat(earnings) || null,
    };
  } catch (e) {
    return { peRatio: null, earnings: null };
  }
}

module.exports = { getGoogleFinanceData };