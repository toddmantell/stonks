import React from "react";
import { render } from "@testing-library/react";
import AddStonk from "./AddStonk";

describe("AddStonk", () => {
  it("adds form data for calculating stonk", () => {
    const { getByTestId, getByText } = render(<AddStonk />);

    expect(getByText("Find New Stonks")).toBeTruthy();
    // expect(getByTestId("check-stonk-form")).toContain("Placeholder");
  });
});
