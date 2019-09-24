import React, { useState } from "react";
// import useForm from "./useForm";

export default AddStonkForm;

function AddStonkForm(props) {
  const [stonkInfo, setStonkInfo] = useState("defaultstonk");

  function setStonk(event) {
    event.persist();
    setTimeout(() => {
      setStonkInfo(event.target.value || "not found");
    }, 1500);
  }

  async function findStonk(tickerOrName) {
    //This function gets passed whatever is typed into the input and
    //makes an api call to find possible matches
    const result = await window.fetch(`https://someurl/${tickerOrName}`);
    const possibleMatches = await result.json();
  }

  function handleSubmit(event) {
    //api call to save the stonk, but for now just alerts 'not implemented'
    event.preventDefault();
    alert("not implemented");
  }
  // const { handleSubmit, setStonk, stonkInfo } = useForm();
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
