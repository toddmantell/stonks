import React from "react";
import { render } from "@testing-library/react";
import AddStonk from "./AddStonk";

describe("CheckStonk", () => {
  it("adds form data for calculating stonk", () => {
    const { getByTestId, getByText } = render(<AddStonk />);

    expect(getByText("Placeholder")).toBeTruthy();
    // expect(getByTestId("check-stonk-form")).toContain("Placeholder");
  });
});
