
import { formatPercentage, getPriceChangeClass } from "../utils/formatters";

interface PriceChangeCellProps {
  value: number;
}

const PriceChangeCell = ({ value }: PriceChangeCellProps) => {
  const className = getPriceChangeClass(value);
  
  return (
    <span className={`${className} font-medium`}>
      {formatPercentage(value)}
    </span>
  );
};

export default PriceChangeCell;
