import React from "react";
import Flippy from "react-flippy";
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
  localTicker
}) {
  return (
    <Flippy
      flipOnHover={false}
      flipOnClick={true}
      flipDirection="horizontal"
      style={{ width: "350px", height: "auto" }}
    >
      <FrontSide
        companyName={companyName}
        latestPrice={latestPrice}
        localTicker={localTicker}
        grahamNumber={grahamNumber}
      />
      <BackSide
        localTicker={localTicker}
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
