import React from "react";
import { render } from "@testing-library/react";
import CheckStonk from "./CheckStonk";

describe("CheckStonk", () => {
  it("adds form data for calculating stonk", () => {
    const { getByTestId, getByText } = render(<CheckStonk />);

    expect(getByText("Placeholder")).toBeTruthy();
    // expect(getByTestId("check-stonk-form")).toContain("Placeholder");
  });
});
