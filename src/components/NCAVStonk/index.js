import React from "react";
import Flippy from "react-flippy";
import FrontSide from "./FrontSide";
import BackSide from "./BackSide";

export default function Stonk({
  companyName,
  forwardConservativeGrahamFormulaNumber,
  forwardGrahamFormulaNumber,
  futureGrowthRate,
  ncavWithTwoDecimals,
  pastConservativeGrahamFormulaNumber,
  pastGrahamFormulaNumber,
  previousGrowthRate,
  priceAsPercentOfNCAV,
  grahamNumber,
  latestPrice,
  changePercent,
  symbol
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
        latestPrice={latestPrice}
        changePercent={changePercent}
        symbol={symbol}
        ncavWithTwoDecimals={ncavWithTwoDecimals}
        priceAsPercentOfNCAV={priceAsPercentOfNCAV}
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
