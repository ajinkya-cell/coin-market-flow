
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface ChartDataPoint {
  timestamp: number;
  price: number;
}

export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  priceChangePercent1h: number;
  priceChangePercent24h: number;
  priceChangePercent7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: ChartDataPoint[];
  lastUpdated: number;
}

interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
}

// Sample initial data for 5 crypto assets
const initialState: CryptoState = {
  assets: [
    {
      id: 'bitcoin',
      rank: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: 'bitcoin-btc-logo.png',
      price: 65432.10,
      priceChangePercent1h: 0.5,
      priceChangePercent24h: 2.3,
      priceChangePercent7d: -1.2,
      marketCap: 1278956000000,
      volume24h: 32456700000,
      circulatingSupply: 19530000,
      maxSupply: 21000000,
      chartData: Array.from({ length: 7 }, (_, i) => ({
        timestamp: Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
        price: 64000 + Math.random() * 3000
      })),
      lastUpdated: Date.now()
    },
    {
      id: 'ethereum',
      rank: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '/ethereum-eth-logo.png',
      price: 3456.78,
      priceChangePercent1h: -0.3,
      priceChangePercent24h: 1.5,
      priceChangePercent7d: 5.4,
      marketCap: 415623000000,
      volume24h: 18765400000,
      circulatingSupply: 120340000,
      maxSupply: null,
      chartData: Array.from({ length: 7 }, (_, i) => ({
        timestamp: Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
        price: 3300 + Math.random() * 300
      })),
      lastUpdated: Date.now()
    },
    {
      id: 'solana',
      rank: 3,
      name: 'Solana',
      symbol: 'SOL',
      logo: '/solana-sol-logo.png',
      price: 148.32,
      priceChangePercent1h: 1.2,
      priceChangePercent24h: 3.7,
      priceChangePercent7d: 9.8,
      marketCap: 65487000000,
      volume24h: 3546700000,
      circulatingSupply: 441000000,
      maxSupply: null,
      chartData: Array.from({ length: 7 }, (_, i) => ({
        timestamp: Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
        price: 140 + Math.random() * 20
      })),
      lastUpdated: Date.now()
    },
    {
      id: 'tether',
      rank: 4,
      name: 'Tether',
      symbol: 'USDT',
      logo: '/tether-usdt-logo.png',
      price: 1.00,
      priceChangePercent1h: 0.01,
      priceChangePercent24h: 0.02,
      priceChangePercent7d: -0.01,
      marketCap: 94560000000,
      volume24h: 65784300000,
      circulatingSupply: 94560000000,
      maxSupply: null,
      chartData: Array.from({ length: 7 }, (_, i) => ({
        timestamp: Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
        price: 0.99 + Math.random() * 0.02
      })),
      lastUpdated: Date.now()
    },
    {
      id: 'ripple',
      rank: 5,
      name: 'XRP',
      symbol: 'XRP',
      logo: '/xrp-xrp-logo.png',
      price: 0.56,
      priceChangePercent1h: -1.7,
      priceChangePercent24h: -3.5,
      priceChangePercent7d: 2.4,
      marketCap: 30567000000,
      volume24h: 1678900000,
      circulatingSupply: 54600000000,
      maxSupply: 100000000000,
      chartData: Array.from({ length: 7 }, (_, i) => ({
        timestamp: Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
        price: 0.53 + Math.random() * 0.06
      })),
      lastUpdated: Date.now()
    }
  ],
  loading: false,
  error: null
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssetPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const { id, price } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        // Calculate price change percentages based on previous price
        const priceChange = ((price - asset.price) / asset.price) * 100;
        asset.price = price;
        asset.priceChangePercent1h += priceChange * 0.1; // Simulated 1h change
        asset.priceChangePercent24h += priceChange * 0.05; // Simulated 24h change
        asset.priceChangePercent7d += priceChange * 0.02; // Simulated 7d change
        asset.volume24h = asset.volume24h * (1 + (Math.random() * 0.02 - 0.01)); // Random volume change ±1%
        asset.lastUpdated = Date.now();
      }
    },
    updateMultipleAssets: (state, action: PayloadAction<Partial<CryptoAsset>[]>) => {
      action.payload.forEach(update => {
        if (update.id) {
          const index = state.assets.findIndex(a => a.id === update.id);
          if (index !== -1) {
            state.assets[index] = { ...state.assets[index], ...update };
          }
        }
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

// Actions
export const { updateAssetPrice, updateMultipleAssets, setLoading, setError } = cryptoSlice.actions;

// Selectors
export const selectAllAssets = (state: RootState) => state.crypto.assets;
export const selectAssetById = (state: RootState, id: string) => 
  state.crypto.assets.find(asset => asset.id === id);
export const selectLoading = (state: RootState) => state.crypto.loading;
export const selectError = (state: RootState) => state.crypto.error;

export default cryptoSlice.reducer;
