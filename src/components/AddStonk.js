import React from "react";
import useForm from "./useForm";

export default AddStonkForm;

function AddStonkForm(props) {
  const { handleSubmit, setStonk, stonkInfo } = useForm();
  return (
    <>
      <form>
        <label htmlFor="stonk-name-finder">
          Enter Stonk Info:
          <input name="stonk-name-finder" type="text" onChange={setStonk} />
        </label>
        <button onClick={handleSubmit}>Add Stonk</button>
      </form>
      <span>{JSON.stringify(stonkInfo)}</span>
    </>
  );
}
