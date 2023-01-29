import React, { useContext } from "react";
import UserContext from "../data/context/UserContext";
import { OPTIONS } from "./SortCardsReducer";

export default function SortCards({ dispatch = () => "" }) {
  const {
    state: { isLoading },
  } = useContext(UserContext);
  const handleSelectSort = (e) => dispatch({ sortValue: +e.target.value });

  const dropdownOptions = Object.keys(OPTIONS);

  return isLoading ? (
    <div>...</div>
  ) : (
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
