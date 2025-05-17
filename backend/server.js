const express = require('express');
const cors = require('cors');
const { getCMP } = require('./fetchYahoo');
const { getGoogleFinanceData } = require('./fetchGoogle');
const portfolio = require('./portfolio.json');

const app = express();
app.use(cors());

app.get('/api/portfolio', async (req, res) => {
  // Fetch live data for each stock
  const updatedPortfolio = await Promise.all(
    portfolio.map(async (stock) => {
      const cmp = await getCMP(stock.exchangeCode);
      const { peRatio, earnings } = await getGoogleFinanceData(stock.exchangeCode);

      const presentValue = cmp ? cmp * stock.quantity : 0;
      const gainLoss = presentValue - stock.investment;

      return {
        ...stock,
        cmp,
        presentValue,
        gainLoss,
        peRatio,
        earnings,
      };
    })
  );
  res.json(updatedPortfolio);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));