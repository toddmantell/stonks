import React, { useContext } from "react";
import { useParams } from "react-router-dom";

export default function StonkDetails({}) {
  const { ticker = "" } = useParams();

  return <div>{ticker}</div>;
}
