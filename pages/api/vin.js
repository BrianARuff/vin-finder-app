// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  const { vin } = req.headers;

  console.log('vin header', vin);

  const { API_ADDRESS, PARTNER_TOKEN, AUTHORIZATION_TOKEN } = process.env;

  console.log('external address', API_ADDRESS + vin);

  const { data } = await axios.get(API_ADDRESS + vin, {
    headers: {
      "content-type": "application/json",
      "authorization": AUTHORIZATION_TOKEN,
      "partner-token": PARTNER_TOKEN,
    }
  });

  const hasError = Object.keys(data.data || {}).length < 1;

  console.log('info serve', data);

  console.log('has err serve', hasError);

  res.status(200).json({ carInfo: data.data, hasError });
};