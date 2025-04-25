
import { useSelector } from "react-redux";
import { selectAllAssets } from "../store/cryptoSlice";
import PriceChangeCell from "./PriceChangeCell";
import MiniChart from "./MiniChart";
import { formatCurrency, formatNumber, getPriceChangeClass } from "../utils/formatters";
import { useMemo } from "react";

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);

  // Memoize the chart colors for each asset
  const assetChartColors = useMemo(() => {
    return assets.reduce<Record<string, string>>((acc, asset) => {
      const isPositive = asset.priceChangePercent7d >= 0;
      acc[asset.id] = isPositive ? '#16c784' : '#ea3943';
      return acc;
    }, {});
  }, [assets]);

  return (
    <div className="overflow-x-auto rounded-lg border border-crypto-subtle">
      <table className="crypto-table">
        <thead>
          <tr>
            <th className="rounded-tl-lg">#</th>
            <th>Name</th>
            <th className="hidden md:table-cell">Symbol</th>
            <th>Price</th>
            <th className="hidden sm:table-cell">1h %</th>
            <th>24h %</th>
            <th className="hidden sm:table-cell">7d %</th>
            <th className="hidden lg:table-cell">Market Cap</th>
            <th className="hidden lg:table-cell">Volume (24h)</th>
            <th className="hidden xl:table-cell">Circulating Supply</th>
            <th className="hidden xl:table-cell">Max Supply</th>
            <th className="hidden md:table-cell rounded-tr-lg">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-crypto-card/50">
              <td>{asset.rank}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <img 
                    src={asset.logo} 
                    alt={`${asset.name} logo`} 
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">{asset.name}</span>
                </div>
              </td>
              <td className="hidden md:table-cell text-crypto-accent">{asset.symbol}</td>
              <td className={`font-medium ${getPriceChangeClass(asset.price - (asset.price / (1 + asset.priceChangePercent24h / 100)))}`}>
                {formatCurrency(asset.price)}
              </td>
              <td className="hidden sm:table-cell">
                <PriceChangeCell value={asset.priceChangePercent1h} />
              </td>
              <td>
                <PriceChangeCell value={asset.priceChangePercent24h} />
              </td>
              <td className="hidden sm:table-cell">
                <PriceChangeCell value={asset.priceChangePercent7d} />
              </td>
              <td className="hidden lg:table-cell">{formatCurrency(asset.marketCap)}</td>
              <td className="hidden lg:table-cell">{formatCurrency(asset.volume24h)}</td>
              <td className="hidden xl:table-cell">
                {formatNumber(asset.circulatingSupply)} {asset.symbol}
              </td>
              <td className="hidden xl:table-cell">
                {asset.maxSupply ? formatNumber(asset.maxSupply) : '∞'}
              </td>
              <td className="hidden md:table-cell">
                <MiniChart 
                  data={asset.chartData} 
                  color={assetChartColors[asset.id]} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
