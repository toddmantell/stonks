export const OPTIONS = {
  "By Ticker": 0,
  "By Company Name": 1,
  "By Undervalued": 2,
  "By Percentage": 3,
};

export default function reducer(state, action) {
  const stonksToSort = state.localStonks.slice();

  switch (action.sortValue) {
    case OPTIONS["By Undervalued"]:
      return { localStonks: stonksToSort.sort(sortByUndervalued) };
    case OPTIONS["By Ticker"]:
      return { localStonks: stonksToSort.sort(sortByTicker) };
    case OPTIONS["By Company Name"]:
      return { localStonks: stonksToSort.sort(sortByCompanyName) };
    case OPTIONS["By Percentage"]:
      return { localStonks: stonksToSort.sort(sortByPercentageLost) };
    default:
      break;
  }
}

function sortByUndervalued(stonka, stonkb) {
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
