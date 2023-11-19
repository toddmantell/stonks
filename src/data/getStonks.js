import settings from "../settings.js";
import { get } from "./fetchWrapper";

export default async function getStonks() {
  const apiUrl = getDevOrProdAPIURL();

  try {
    const stonks = await get(`${apiUrl}/api/stock/dashboard`);
    return stonks.length ? stonks : [];
  } catch (error) {
    console.log(
      `An error occurred while trying to fetch stonks: ${error.toString()}`
    );
    return [];
  }
}

export function getDevOrProdAPIURL() {
  return settings.PROD_API_URL;
}
