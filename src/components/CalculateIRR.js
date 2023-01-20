import React, { useState } from "react";

export default function IRRWidget({
  stonk,
  setPriceChartData,
  setPercentageChartData,
}) {
  const [irrInputs, setIRRInputs] = useState({
    lowPE: 0,
    highPE: 0,
    avgPE: 0,
    growthRate: 0,
  });

  const convertToPercent = (value) => ((value - 1) * 100).toFixed(2);

  function calculateIRR() {
    const { lowPE, highPE, avgPE, growthRate } = irrInputs;
    const { ttmEPS = 0, latestPrice = 0 } = stonk;

    // calculate the things
    const holdingPeriod = 10;
    const growthAsPercent = growthRate / 100;
    const growthRateHalved = growthAsPercent * 0.5;
    const tenYearEPS = ttmEPS * (1 + growthAsPercent) ** holdingPeriod;
    const tenYearWithHalvedGrowth =
      ttmEPS * (1 + growthRateHalved) ** holdingPeriod;

    setPriceChartData([
      {
        name: `Low P/E (${lowPE})`,
        "base% growth": +(tenYearEPS * lowPE).toFixed(2),
        "halved% growth": +(tenYearWithHalvedGrowth * lowPE).toFixed(2),
      },
      {
        name: `High P/E (${highPE})`,
        "base% growth": +(tenYearEPS * highPE).toFixed(2),
        "halved% growth": +(tenYearWithHalvedGrowth * highPE).toFixed(2),
      },
      {
        name: `Avg P/E (${avgPE})`,
        "base% growth": +(tenYearEPS * avgPE).toFixed(2),
        "halved% growth": +(tenYearWithHalvedGrowth * avgPE).toFixed(2),
      },
    ]);

    setPercentageChartData([
      {
        name: `Low P/E (${lowPE})`,
        "base% growth": convertToPercent(
          (+(tenYearEPS * lowPE).toFixed(2) / latestPrice) **
            (1 / holdingPeriod)
        ),
        "halved% growth": convertToPercent(
          (+(tenYearWithHalvedGrowth * lowPE).toFixed(2) / latestPrice) **
            (1 / holdingPeriod)
        ),
      },
      {
        name: `High P/E (${highPE})`,
        "base% growth": convertToPercent(
          (+(tenYearEPS * highPE).toFixed(2) / latestPrice) **
            (1 / holdingPeriod)
        ),
        "halved% growth": convertToPercent(
          (+(tenYearWithHalvedGrowth * highPE).toFixed(2) / latestPrice) **
            (1 / holdingPeriod)
        ),
      },
      {
        name: `Avg P/E (${avgPE})`,
        "base% growth": convertToPercent(
          (+(tenYearEPS * avgPE).toFixed(2) / latestPrice) **
            (1 / holdingPeriod)
        ),
        "halved% growth": convertToPercent(
          (+(tenYearWithHalvedGrowth * avgPE).toFixed(2) / latestPrice) **
            (1 / holdingPeriod)
        ),
      },
    ]);
  }

  const handleTextInput = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "low-pe":
        setIRRInputs({ ...irrInputs, lowPE: +value });
        break;
      case "high-pe":
        setIRRInputs({ ...irrInputs, highPE: +value });
        break;
      case "avg-pe":
        setIRRInputs({ ...irrInputs, avgPE: +value });
        break;
      case "growth-rate":
        setIRRInputs({ ...irrInputs, growthRate: +value });
        break;
      default:
        console.log("whaa");
    }
  };

  return (
    <section>
      <form onSubmit={calculateIRR}>
        <div>
          Low P/E:
          <input
            type="text"
            id="low-pe"
            className="textbox numerical-input"
            onChange={handleTextInput}
          />
        </div>
        <div>
          High P/E:
          <input
            type="text"
            id="high-pe"
            className="textbox numerical-input"
            onChange={handleTextInput}
          />
        </div>
        <div>
          Avg P/E:
          <input
            type="text"
            id="avg-pe"
            className="textbox numerical-input"
            onChange={handleTextInput}
          />
        </div>
        <div>
          Growth Rate:
          <input
            type="text"
            id="growth-rate"
            className="textbox numerical-input"
            onChange={handleTextInput}
          />
        </div>
      </form>
      <button id="calculate-metrics" onClick={calculateIRR}>
        Calculate IRR
      </button>
      <div id="stonk-name" style={{ marginTop: "1rem" }}>
        {stonk.companyName}
      </div>
    </section>
  );
}
