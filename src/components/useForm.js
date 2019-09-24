import React, { useState } from "react";

export default function(callback) {
  const [stonkInfo, setStonkInfo] = useState("defaultstonk");

  function setStonk(event) {
    event.persist();
    setTimeout(() => {
      setStonkInfo(event.target.value || "not found");
    }, 1500);
  }

  function handleSubmit(event) {
    //api call to save the stonk, but for now just alerts 'not implemented'
    event.preventDefault();
    alert("not implemented");
  }

  return { handleSubmit, setStonk, stonkInfo };
}
