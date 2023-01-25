import React from "react";
import { OPTIONS } from "./SortCardsReducer";

export default function SortCards({ dispatch = () => "" }) {
  const handleSelectSort = (e) => dispatch({ sortValue: +e.target.value });

  const dropdownOptions = Object.keys(OPTIONS);
  return (
    <div className="sort-dropdown">
      <label className="sort-label">Sort</label>
      <span className="sort">
        <select onChange={handleSelectSort}>
          {dropdownOptions.map((option, index) => (
            <option key={`option-${index}`} value={index}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}
