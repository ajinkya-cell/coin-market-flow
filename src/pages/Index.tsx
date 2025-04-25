
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import CryptoTable from "../components/CryptoTable";
import websocketService from "../services/websocketService";
import { RefreshCw } from "lucide-react";

const CryptoTracker = () => {
  useEffect(() => {
    // Connect to the websocket service when the component mounts
    websocketService.connect();
    
    // Disconnect when the component unmounts
    return () => {
      websocketService.disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Crypto Market</h1>
        <div className="flex items-center text-crypto-accent text-sm">
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          <span>Live updates</span>
        </div>
      </div>
      
      <CryptoTable />
      
      <footer className="mt-8 text-center text-sm text-crypto-accent">
        <p>Data refreshes automatically every 1-2 seconds</p>
        <p className="mt-2">Crypto Market Flow — Simulated real-time data</p>
      </footer>
    </div>
  );
};

const Index = () => (
  <Provider store={store}>
    <CryptoTracker />
  </Provider>
);

export default Index;
