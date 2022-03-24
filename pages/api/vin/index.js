// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  const { vin } = req.headers;

  const { API_ADDRESS, PARTNER_TOKEN, AUTHORIZATION_TOKEN } = process.env;

  const { data } = await axios.get(API_ADDRESS + vin, {
    headers: {
      "content-type": "application/json",
      "authorization": AUTHORIZATION_TOKEN,
      "partner-token": PARTNER_TOKEN,
    }
  });

  const hasError = Object.keys(data.data || {}).length === 0;

  res.status(200).json({ carInfo: data.data, hasError });
};