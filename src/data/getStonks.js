import settings from "../settings.js";

export default async function getStonks() {
  console.log("node env:", process.env.NODE_ENV);

  const fetchOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  };

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? settings.PROD_API_URL
      : settings.DEV_API_URL;
  const stonks = await fetch(`${apiUrl}/api/dashboard`, fetchOptions);
  const resolvedStonks = await stonks.json();

  return resolvedStonks.length ? resolvedStonks : [];
}
