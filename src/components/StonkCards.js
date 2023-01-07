import React, { useReducer } from "react";
import Stonk from "./Stonk";
import NCAVStonk from "./NCAVStonk";
import reducer, { OPTIONS } from "./StonkCardsReducer";

export default function StonkCards({ stonks = [], removeStonk = () => "" }) {
  const [state, dispatch] = useReducer(reducer, { localStonks: stonks });

  const handleSelectSort = (e) => dispatch({ sortValue: +e.target.value });

  const dropdownOtions = Object.keys(OPTIONS);

  return (
    <>
      <div>
        <label>Sort</label>
        <span className="sort">
          <select onChange={handleSelectSort}>
            {dropdownOtions.map((option, index) => (
              <option key={`option-${index}`} value={index}>
                {option}
              </option>
            ))}
          </select>
        </span>
      </div>
      {state.localStonks.map((stonk, index) => {
        return stonk.priceAsPercentOfNCAV > 0 &&
          stonk.priceAsPercentOfNCAV < 100 ? (
          <NCAVStonk key={`stonk-${index}`} {...{ ...stonk, removeStonk }} />
        ) : (
          <Stonk key={`stonk-${index}`} {...{ ...stonk, removeStonk }} />
        );
      })}
    </>
  );
}
