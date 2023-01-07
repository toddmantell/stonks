export const OPTIONS = {
	BY_TICKER: 0,
	BY_CO_NAME: 1,
	BY_UNDERVALUED: 2,
	BY_PERCENTAGE: 3
}

export default function reducer(state, action) {
	const stonksToSort = state.localStonks.slice();
	if (action.sortValue === OPTIONS.BY_UNDERVALUED) return { localStonks: stonksToSort.sort(sortByUndervalued) };
	else if (action.sortValue === OPTIONS.BY_TICKER) return { localStonks: stonksToSort.sort(sortByTicker) };
	else if (action.sortValue === OPTIONS.BY_CO_NAME) return { localStonks: stonksToSort.sort(sortByCompanyName) };
	else if (action.sortValue === OPTIONS.BY_PERCENTAGE) return { localStonks: stonksToSort.sort(sortByPercentageLost) };
}

function sortByUndervalued (stonka, stonkb) {
	return (+stonka.latestPrice / stonka.forwardConservativeGrahamFormulaNumber) - (+stonkb.latestPrice / stonkb.forwardConservativeGrahamFormulaNumber);
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

function sortByCompanyName (stonka, stonkb) {
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