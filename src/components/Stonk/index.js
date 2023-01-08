import React from "react";
import Flippy from "react-flippy";
import FrontSide from "./FrontSide.jsx";
import BackSide from "./BackSide.jsx";

export default function Stonk({
  companyName,
  forwardConservativeGrahamFormulaNumber,
  forwardGrahamFormulaNumber,
  futureGrowthRate,
  pastConservativeGrahamFormulaNumber,
  pastGrahamFormulaNumber,
  previousGrowthRate,
  grahamNumber,
  latestPrice,
  changePercent,
  symbol,
  peRatio,
}) {
  return (
    <Flippy
      flipOnHover={false}
      flipOnClick={true}
      flipDirection="horizontal"
      style={{ width: "300px", height: "220px" }}
    >
      <FrontSide
        companyName={companyName}
				changePercent={changePercent}
        forwardConservativeGrahamFormulaNumber={
          forwardConservativeGrahamFormulaNumber
        }
				grahamNumber={grahamNumber}
        latestPrice={latestPrice}
				pastConservativeGrahamFormulaNumber={pastConservativeGrahamFormulaNumber}
        peRatio={peRatio}
				symbol={symbol}
      />
      <BackSide
        symbol={symbol}
        latestPrice={latestPrice}
        forwardConservativeGrahamFormulaNumber={
          forwardConservativeGrahamFormulaNumber
        }
        forwardGrahamFormulaNumber={forwardGrahamFormulaNumber}
        futureGrowthRate={futureGrowthRate}
        pastConservativeGrahamFormulaNumber={
          pastConservativeGrahamFormulaNumber
        }
        pastGrahamFormulaNumber={pastGrahamFormulaNumber}
        previousGrowthRate={previousGrowthRate}
      />
    </Flippy>
  );
}
