const yahooFinance = require('yahoo-finance2').default;

async function getCMP(symbol) {
  try {
    const quote = await yahooFinance.quote(symbol);
    return quote.regularMarketPrice;
  } catch (e) {
    return null;
  }
}

module.exports = { getCMP };