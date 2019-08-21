import settings from "../settings.js";

export default async function getStonks() {
  console.log("node env:", process.env.NODE_ENV);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? settings.PROD_API_URL
      : settings.DEV_API_URL;
  const stonks = await fetch(`${apiUrl}/api/dashboard`);
  const resolvedStonks = await stonks.json();

  return resolvedStonks.length ? resolvedStonks : [];
}
