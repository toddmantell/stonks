import React, { useState } from "react";

export default function CheckStonk() {
  return (
    <form data-testid="check-stonk-form">
      <h2 data-testid="form-heading">Placeholder</h2>
      <label htmlFor="" data-testid="stonk-name-label">
        Enter Stonk Symbol
        <input
          id="stonk-symbol"
          placeholder="Stonk Symbol"
          data-testid="stonk-symbol"
        />
      </label>
    </form>
  );
}
