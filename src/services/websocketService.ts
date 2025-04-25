
import { store } from '../store/store';
import { updateAssetPrice } from '../store/cryptoSlice';

class MockWebSocketService {
  private intervalId: number | null = null;
  private updateFrequency: number;
  private isConnected: boolean = false;

  constructor(updateFrequencyMs = 2000) {
    this.updateFrequency = updateFrequencyMs;
  }

  connect(): void {
    if (this.isConnected) return;
    
    console.log('WebSocket connected');
    this.isConnected = true;
    this.startPriceUpdates();
  }

  disconnect(): void {
    if (!this.isConnected) return;
    
    console.log('WebSocket disconnected');
    this.isConnected = false;
    this.stopPriceUpdates();
  }

  private startPriceUpdates(): void {
    if (this.intervalId !== null) return;
    
    this.intervalId = window.setInterval(() => {
      // Get current assets from store
      const assets = store.getState().crypto.assets;
      
      // Randomly select 1-3 assets to update
      const numAssetsToUpdate = Math.floor(Math.random() * 3) + 1;
      const assetIndexesToUpdate = new Set<number>();
      
      while (assetIndexesToUpdate.size < numAssetsToUpdate) {
        const randomIndex = Math.floor(Math.random() * assets.length);
        assetIndexesToUpdate.add(randomIndex);
      }
      
      // Update each selected asset
      assetIndexesToUpdate.forEach(index => {
        const asset = assets[index];
        
        // Calculate a random price change (±2%)
        const changePercent = (Math.random() * 4) - 2;
        const newPrice = asset.price * (1 + changePercent / 100);
        
        // Dispatch price update action
        store.dispatch(updateAssetPrice({
          id: asset.id,
          price: newPrice
        }));
      });
    }, this.updateFrequency);
  }

  private stopPriceUpdates(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Create singleton instance
const websocketService = new MockWebSocketService();

export default websocketService;
