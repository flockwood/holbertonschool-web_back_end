import Pricing from './4-pricing';
import Currency from './3-currency';

const p = new Pricing(100, new Currency("EUR", "Euro"))
console.log(p);
console.log(p.displayFullPrice());

// Test the static method
console.log(Pricing.convertPrice(100, 1.2));  // Should output: 120