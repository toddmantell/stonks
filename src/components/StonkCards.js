/* eslint-disable */
import React, {useState, useEffect} from 'react';
import Stonk from "./Stonk";
import NCAVStonk from "./NCAVStonk";

export default function StonkCards({stonks = [], options = [], removeStonk = () => ''}) {

	const [sortValue, setSortValue] = useState(-1);
	const [sortedStonks, setSortedStonks] = useState(stonks);

	function sortByUndervalued (stonka, stonkb) {
		return (+stonka.latestPrice / stonka.forwardConservativeGrahamFormulaNumber) - (+stonkb.latestPrice / stonkb.forwardConservativeGrahamFormulaNumber);
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

	const handleSelectSort = e => setSortValue(+e.target.value);

	useEffect(() => {
		const stonksToSort = sortedStonks.slice();
		if (sortValue === 2) setSortedStonks(stonksToSort.sort(sortByUndervalued))
		else if (sortValue === 0) setSortedStonks(stonks)
		else if (sortValue === 1) setSortedStonks(stonksToSort.sort(sortByCompanyName))
		else if (sortValue === 3) setSortedStonks(stonksToSort.sort(sortByPercentageLost))
	}, [sortValue])

	return (
		<>
		<div>
			<label>Sort</label>
			<span className="sort">
				<select onChange={handleSelectSort}>
						{options.map((option, index) => <option key={`option-${index}`} value={index}>{option}</option>)}
				</select>
			</span>
		</div>
		{sortedStonks.map((stonk, index) => {
			return stonk.priceAsPercentOfNCAV > 0 &&
				stonk.priceAsPercentOfNCAV < 100 ? (
				<NCAVStonk
					key={`stonk-${index}`}
					{...{ ...stonk, removeStonk }}
				/>
			) : (
				<Stonk key={`stonk-${index}`} {...{ ...stonk, removeStonk }} />
			);
		})}
		</>
	)	
}