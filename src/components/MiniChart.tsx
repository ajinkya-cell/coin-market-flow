
import { ChartDataPoint } from "../store/cryptoSlice";
import { useMemo } from "react";

interface MiniChartProps {
  data: ChartDataPoint[];
  color: string;
  width?: number;
  height?: number;
}

const MiniChart = ({ data, color, width = 100, height = 40 }: MiniChartProps) => {
  const chartPoints = useMemo(() => {
    if (!data || data.length < 2) return '';
    
    // Get min and max for scaling
    const prices = data.map(point => point.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice;
    
    // Calculate the points for the polyline
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * width;
      // Flip Y coordinate (SVG y=0 is top)
      const y = height - ((point.price - minPrice) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return points;
  }, [data, width, height]);

  if (!data || data.length < 2) {
    return <div className="w-full h-full flex items-center justify-center text-xs text-crypto-subtle">No data</div>;
  }

  return (
    <div className="inline-block overflow-hidden">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <polyline
          points={chartPoints}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default MiniChart;
