/* eslint-disable */
import React, {useState, useReducer} from 'react';
import Stonk from "./Stonk";
import NCAVStonk from "./NCAVStonk";
import reducer from "./StonkCardsReducer";

export default function StonkCards({stonks = [], removeStonk = () => ''}) {

	const [sortValue, setSortValue] = useState(-1);
	const [state, dispatch] = useReducer(reducer, { localStonks: stonks })

	console.log('state:', state);
	

	const handleSelectSort = e => dispatch({sortValue: +e.target.value});

	const options = ["By Ticker", "By Co. Name", "By Undervalued", "By % Change"];

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
		{state.localStonks.map((stonk, index) => {
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