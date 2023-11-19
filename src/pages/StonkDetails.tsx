import React from "react";
import { useParams } from "react-router-dom";

export default function StonkDetails(props) {
  const { ticker = "" } = useParams();

  return <div>{ticker}</div>;
}
