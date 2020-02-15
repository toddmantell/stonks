import React from "react";
import Flippy from "react-flippy";
import FrontSide from "./FrontSide";
import BackSide from "./BackSide";

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
  removeStonk
}) {
  return (
    <Flippy
      flipOnHover={false}
      flipOnClick={false}
      flipDirection="horizontal"
      style={{ width: "300px", height: "255px" }}
    >
      <FrontSide
        companyName={companyName}
        latestPrice={latestPrice}
        changePercent={changePercent}
        symbol={symbol}
        grahamNumber={grahamNumber}
        removeStonk={removeStonk}
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
        removeStonk={removeStonk}
      />
    </Flippy>
  );
}
