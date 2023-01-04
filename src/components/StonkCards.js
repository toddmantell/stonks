/* eslint-disable */
import React, {useState, useEffect} from 'react';
import Stonk from "./Stonk";
import NCAVStonk from "./NCAVStonk";

export default function StonkCards({stonks = [], options = [], removeStonk = () => ''}) {

	const [sortValue, setSortValue] = useState(-1);
	const [sortedStonks, setSortedStonks] = useState(stonks);

	function sortByUndervalued (stonka, stonkb) {
		return checkForNonNegativeValue(+stonka.forwardConservativeGrahamFormulaNumber, +stonkb.forwardConservativeGrahamFormulaNumber) && (stonka.latestPrice / stonka.forwardConservativeGrahamFormulaNumber) - (stonkb.latestPrice / stonkb.forwardConservativeGrahamFormulaNumber);
	}

	function checkForNonNegativeValue(stonkValue1, stonkValue2) {
		if (stonkValue1 > 0 && stonkValue2 > 0) return true; 
	}

	function sortByCompanyName (a, b) {
		if (a.companyName > b.companyName) {
			return 1;
	}
	if (b.companyName > a.companyName) {
			return -1;
	}
	return 0;
	}

	const handleSelectSort = e => setSortValue(+e.target.value);

	useEffect(() => {
		const stonksToSort = sortedStonks.slice();
		if (sortValue === 2) setSortedStonks(stonksToSort.sort(sortByUndervalued))
		else if (sortValue === 0) setSortedStonks(stonks)
		else if (sortValue === 1) setSortedStonks(stonksToSort.sort(sortByCompanyName))
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