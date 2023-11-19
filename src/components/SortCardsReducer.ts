export const OPTIONS = {
  "By Ticker": 0,
  "By Company Name": 1,
  "By Undervalued": 2,
  "By Percentage": 3,
};

export default function reducer(stonks, action) {
  const stonksToSort = stonks.slice();

  switch (action.sortValue) {
    case OPTIONS["By Undervalued"]:
      return stonksToSort.sort(sortByUndervalued);
    case OPTIONS["By Ticker"]:
      return stonksToSort.sort(sortByTicker);
    case OPTIONS["By Company Name"]:
      return stonksToSort.sort(sortByCompanyName);
    case OPTIONS["By Percentage"]:
      return stonksToSort.sort(sortByPercentageLost);
    default:
      break;
  }
}

function sortByUndervalued(stonka, stonkb) {
  if (
    stonka.forwardConservativeGrahamFormulaNumber >= 0 &&
    stonkb.forwardConservativeGrahamFormulaNumber >= 0
  )
    return (
      +stonka.latestPrice / stonka.forwardConservativeGrahamFormulaNumber -
      +stonkb.latestPrice / stonkb.forwardConservativeGrahamFormulaNumber
    );
}

function sortByTicker(stonka, stonkb) {
  if (stonka.symbol > stonkb.symbol) {
    return 1;
  }
  if (stonkb.symbol > stonka.symbol) {
    return -1;
  }
  return 0;
}

function sortByCompanyName(stonka, stonkb) {
  if (stonka.companyName > stonkb.companyName) {
    return 1;
  }
  if (stonkb.companyName > stonka.companyName) {
    return -1;
  }
  return 0;
}

function sortByPercentageLost(stonka, stonkb) {
  return +stonka.changePercent - +stonkb.changePercent;
}
