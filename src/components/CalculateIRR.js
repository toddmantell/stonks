import React, { useState } from "react";

export default function IRRWidget({ stonk, setChartData }) {
  const [irrInputs, setIRRInputs] = useState({
    lowPE: 0,
    highPE: 0,
    avgPE: 0,
    growthRate: 0,
  });
  const [irrMetrics, setIRRMetrics] = useState([]);

  function calculateIRR() {
    const { lowPE, highPE, avgPE, growthRate } = irrInputs;
    const { ttmEPS = 0 } = stonk;

    // calculate the things
    const holdingPeriod = 10;
    const growthAsPercent = growthRate / 100;
    const growthRateHalved = growthAsPercent * 0.5;
    const tenYearEPS = ttmEPS * (1 + growthAsPercent) ** holdingPeriod;
    const tenYearWithHalvedGrowth =
      ttmEPS * (1 + growthRateHalved) ** holdingPeriod;

    setChartData([
      {
        name: `Low P/E (${lowPE})`,
        "base% growth": tenYearEPS * lowPE,
        "halved% growth": tenYearWithHalvedGrowth * lowPE,
      },
      {
        name: `High P/E (${highPE})`,
        "base% growth": tenYearEPS * highPE,
        "halved% growth": tenYearWithHalvedGrowth * highPE,
      },
      {
        name: `Avg P/E (${avgPE})`,
        "base% growth": tenYearEPS * avgPE,
        "halved% growth": tenYearWithHalvedGrowth * avgPE,
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
            className="textbox"
            onChange={handleTextInput}
          />
        </div>
        <div>
          High P/E:
          <input
            type="text"
            id="high-pe"
            className="textbox"
            onChange={handleTextInput}
          />
        </div>
        <div>
          Avg P/E:
          <input
            type="text"
            id="avg-pe"
            className="textbox"
            onChange={handleTextInput}
          />
        </div>
        <div>
          Growth Rate:
          <input type="text" id="growth-rate" onChange={handleTextInput} />
        </div>
      </form>
      <button id="calculate-metrics" onClick={calculateIRR}>
        Calculate IRR
      </button>
      <div>
        {irrMetrics &&
          irrMetrics.length &&
          irrMetrics.map((metric, index) => (
            <div key={index}>{JSON.stringify(metric)}</div>
          ))}
      </div>
    </section>
  );
}
