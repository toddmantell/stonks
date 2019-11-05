import React from "./node_modules/react";
import Flippy from "./node_modules/react-flippy";
import FrontSide from "./FrontSide";
import BackSide from "./BackSide";

export default function Stonk({
  companyName,
  forwardConservativeGrahamFormulaNumber,
  forwardGrahamFormulaNumber,
  pastConservativeGrahamFormulaNumber,
  pastGrahamFormulaNumber,
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
        grahamNumber={grahamNumber}
      />
      <BackSide
        symbol={symbol}
        latestPrice={latestPrice}
        forwardConservativeGrahamFormulaNumber={
          forwardConservativeGrahamFormulaNumber
        }
        forwardGrahamFormulaNumber={forwardGrahamFormulaNumber}
        pastConservativeGrahamFormulaNumber={
          pastConservativeGrahamFormulaNumber
        }
        pastGrahamFormulaNumber={pastGrahamFormulaNumber}
      />
    </Flippy>
  );
}
