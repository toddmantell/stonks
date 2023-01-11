import React from "react";
import Typeahead from "./AlternativeTypeahead";

const AddStonkForm = ({
  getStonkCalculation,
  setTickerAndGetQuote,
  setInputValue,
  previousGrowthRate,
  futureGrowthRate,
}) => (
  <form
    data-testid="add-stonk-form"
    className="add-stonk-form"
    onSubmit={getStonkCalculation}
  >
    <h2 data-testid="form-heading" className="add-stonk-heading">
      Add A New Stonk:
    </h2>
    <div>
      <label
        htmlFor="stonk-symbol"
        data-testid="stonk-symbol-label"
        className="input-label"
      >
        Enter Stonk Symbol:
      </label>
      <Typeahead setTickerAndGetQuote={setTickerAndGetQuote} />
    </div>
    <div>
      <label
        id="previous-growth-label"
        htmlFor="previous-growth-rate"
        data-testid="previous-growth-label"
        className="input-label"
      >
        Previous 5 Year Growth Rate:
      </label>
      <input
        type="text"
        id="previous-growth-rate"
        aria-labelledby="previous-growth-label"
        placeholder="Previous growth rate"
        data-testid="previous-growth-rate"
        className="textbox"
        onChange={setInputValue}
        value={previousGrowthRate || ""}
      />
    </div>
    <div>
      <label
        id="future-growth-label"
        htmlFor="future-growth-rate"
        data-testid="future-growth-label"
        className="input-label"
      >
        Expected Future Growth Rate:
      </label>
      <input
        type="text"
        id="future-growth-rate"
        aria-labelledby="future-growth-label"
        placeholder="Future growth rate"
        data-testid="future-growth-rate"
        className="textbox"
        onChange={setInputValue}
        value={futureGrowthRate || ""}
      />
    </div>
    <button type="submit" className="form-button">
      Get Calculation
    </button>
  </form>
);

export default AddStonkForm;
