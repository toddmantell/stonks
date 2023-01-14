import React from "react";
import { render, screen } from "@testing-library/react";
import AddStonk from "./AddStonk";

describe("AddStonk", () => {
  it("adds form data for calculating stonk", () => {
    render(<AddStonk />);

    expect(screen.getByText("Enter Stonk Symbol:")).toBeTruthy();
  });
});
