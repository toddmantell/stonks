import React from "react";
import { render, screen } from "@testing-library/react";
import StonksDashboard from "./Dashboard";
import UserContext from "../data/context/UserContext";

describe("Dashboard", () => {
  it("should render a skeleton", () => {
    const stub = () => "";
    const value = {
      state: {},
      addStonkToStonks: stub,
      removeStonk: stub,
    };

    render(
      <UserContext.Provider value={value}>
        <StonksDashboard />
      </UserContext.Provider>
    );

    expect(screen.getByTestId("stonks-container")).toBeTruthy();
  });
});
