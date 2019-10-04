import settings from "../settings.js";
import { get } from "../fetchWrapper";

export default async function getStonks() {
  console.log("node env:", process.env.NODE_ENV);

  const apiUrl = getDevOrProdAPIURL();

  try {
    const stonks = await get(`${apiUrl}/api/dashboard`);
    return stonks.length ? stonks : [];
  } catch (error) {
    console.log(
      `An error occurred while trying to fetch stonks: ${error.toString()}`
    );
    return [];
  }
}

export function getDevOrProdAPIURL() {
  if (process.env.NODE_ENV === "production") return settings.PROD_API_URL;
  return settings.DEV_API_URL;
}
