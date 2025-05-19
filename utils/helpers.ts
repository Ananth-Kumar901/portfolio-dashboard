import { PortfolioStock } from './types';

export async function fetchPortfolio(): Promise<PortfolioStock[]> {
  const res = await fetch('http://localhost:4000/api/portfolio');
  return res.json();
}