/*
  👻 AAVE Health Factor Module 👻
  
  (CollatConvertedToEth * 82.5%) / TotalBorrowed In ETH

  More information: https://docs.aave.com/risk/asset-risk/risk-parameters#health-factor

*/

var chalk = require("chalk")
var config = require("../config.json")

function aaveHealthFactor(coinPrices, VS_CURRENCY) {
  // Externals
  const wethPrice = coinPrices.weth[VS_CURRENCY]
  const currency = VS_CURRENCY.toUpperCase()

  // Collateral
  const collateralInEth = config.aave.collateralInEth // TO BE SET IN CONFIG
  const collateralInCurrency = (collateralInEth * wethPrice).toFixed(2)

  // Borrowed
  const borrowedInUSD = config.aave.borrowedInUsd
  const borrowedInEth = borrowedInUSD / wethPrice
  // const borrowedInCurrency = (borrowedInEth * wethPrice).toFixed(2);

  // Liquidation Threshold set by AAVE - Static
  const LT = 0.825
  const healthFactor = ((collateralInEth * LT) / borrowedInEth).toFixed(2)

  console.log(`${chalk.bold.bgMagenta(`👻 AAVE Health Factor     ~${healthFactor} `)}`)
  // console.log(`  Collateral....${collateralInCurrency} ${currency}`);
  // console.log(`  Borrowed.......${borrowedInCurrency} ${currency}`);
}

module.exports = { aaveHealthFactor }