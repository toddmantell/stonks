import React from "react";
import TypeAhead from "./TypeAhead";

const AddStonkForm = ({
  getStonkCalculation,
  setTickerAndGetQuote,
  setInputValue,
  previousGrowthRate,
  futureGrowthRate
}) => (
  <form
    data-testid="add-stonk-form"
    className="add-stonk-form"
    onSubmit={getStonkCalculation}
  >
    <h2 data-testid="form-heading" className="add-stonk-heading">
      Find New Stonks:
    </h2>
    <div>
      <label
        htmlFor="stonk-symbol"
        data-testid="stonk-symbol-label"
        className="input-label"
      >
        Enter Stonk Symbol:
      </label>
      <TypeAhead
        handleInputChange={setTickerAndGetQuote}
        defaults={[{ value: "default", label: "Enter Ticker" }]}
      />
    </div>
    <div>
      <label
        htmlFor="previous-growth-rate"
        data-testid="previous-growth-label"
        className="input-label"
      >
        Previous 5 Year Growth Rate:
      </label>
      <input
        type="text"
        id="previous-growth-rate"
        placeholder="Previous growth rate"
        data-testid="previous-growth-rate"
        className="textbox"
        onChange={setInputValue}
        value={previousGrowthRate || ""}
      />
    </div>
    <div>
      <label
        htmlFor="future-growth-rate"
        data-testid="future-growth-label"
        className="input-label"
      >
        Expected Future Growth Rate:
      </label>
      <input
        type="text"
        id="future-growth-rate"
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
