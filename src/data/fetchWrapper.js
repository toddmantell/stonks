const baseFetchOptions = {
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
};

export const get = async (url, customOptions) => {
  const fetchOptions = customOptions
    ? { ...baseFetchOptions, method: "GET", ...customOptions }
    : { ...baseFetchOptions, method: "GET" };

  try {
    return await fetchWrapper(url, fetchOptions);
  } catch (error) {
    throw error;
  }
};

export const post = async (url, payload, customOptions) => {
  if (!payload) {
    return new Error(
      "You must include the data to post when making a POST request."
    );
  }

  const fetchOptions = customOptions
    ? {
        ...baseFetchOptions,
        method: "POST",
        body: JSON.stringify(payload),
        ...customOptions,
      }
    : { ...baseFetchOptions, method: "POST", body: JSON.stringify(payload) };

  try {
    return await fetchWrapper(url, fetchOptions);
  } catch (error) {
    throw error;
  }
};

/**
 * This wrapper exists because fetch doesn't throw if it receives a 400 or 500 level error
 * @param {String} url The url to the resource we are fetching
 * @param {Object} options The options object that fetch requires for non-gets
 */
async function fetchWrapper(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Fetch failed because it received a non-200 level status: ${await response.text()}`
      );
    }

    return await response.json();
  } catch (error) {
    console.log(`Error thrown in fetchWrapper: ${error.toString()}`);
    throw error;
  }
}
