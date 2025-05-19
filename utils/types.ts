export interface PortfolioStock {
  sector: string;
  name: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercent: number;
  exchangeCode: string;
  cmp: number | null;
  presentValue: number;
  gainLoss: number;
  peRatio: number | null;
  earnings: number | null;
}