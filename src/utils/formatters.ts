
/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (amount: number): string => {
  // For very large numbers (billions+), use abbreviations
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(2)}B`;
  } else if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(2)}M`;
  } else if (amount >= 10000) {
    return `$${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  } else if (amount >= 1) {
    return `$${amount.toFixed(2)}`;
  } else {
    // For very small values like $0.00001234
    return `$${amount.toPrecision(4)}`;
  }
};

/**
 * Format a percentage value with + or - sign
 */
export const formatPercentage = (percent: number): string => {
  const sign = percent > 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
};

/**
 * Format a large number with commas or abbreviations
 */
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  } else {
    return num.toLocaleString();
  }
};

/**
 * Calculate the class to use for price changes (positive/negative)
 */
export const getPriceChangeClass = (percent: number): string => {
  if (percent > 0) return 'price-up';
  if (percent < 0) return 'price-down';
  return '';
};
