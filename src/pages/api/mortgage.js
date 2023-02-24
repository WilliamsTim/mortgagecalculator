export default function handler(req, res) {
 const {amount, percentage, interest, propertyTax, homeAssoc, mortgageInsurance, homeInsurance} = req.query;
  // I need principle, interest, number of months
  // principle will either be given as loan amount or can be calculated with down payment percentage and house value
  const P = amount - amount * (percentage / 100);
  const i = interest / 1200;
  const tax = propertyTax || 0.01;
  const hoa = homeAssoc || 0;
  const pmi = mortgageInsurance || 0;
  const insurance = homeInsurance || 1500;
  // I will validate that these values exist on the form on the front end so no validation is necessary on the backend
  const m10 = P * (i * (1 + i) ** 120) / ((1 + i) ** 120 - 1) + (amount * tax + hoa + pmi + insurance) / 12;
  const m15 = P * (i * (1 + i) ** 180) / ((1 + i) ** 180 - 1) + (amount * tax + hoa + pmi + insurance) / 12;
  const m30 = P * (i * (1 + i) ** 360) / ((1 + i) ** 360 - 1) + (amount * tax + hoa + pmi + insurance) / 12;
  res.status(200).json({ tenYear: Math.round(m10), fifteenYear: Math.round(m15), thirtyYear: Math.round(m30), });
}
// Mortgage calculation formula
// M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]. 
// Here’s a breakdown of each of the variables:
// M = Total monthly payment
// P = The total amount of your loan
// I = Your interest rate, as a monthly percentage
// N = The total amount of months in your timeline for paying off your mortgage