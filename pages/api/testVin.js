// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
    console.log(req.headers);
    const { TEST_API_ADDRESS, PARTNER_TOKEN, AUTHORIZATION_TOKEN } = process.env;

    // const { data: carInfo } = await axios.get(TEST_API_ADDRESS, {
    //     headers: {
    //         "content-type": "application/json",
    //         "authorization": AUTHORIZATION_TOKEN,
    //         "partner-token": PARTNER_TOKEN,
    //     }
    // });

    // console.log('car info', carInfo);

    const data = JSON.parse({
        "message": {
            "code": 0,
            "message": "ok",
            "credentials": "valid",
            "version": "v3.0.0",
            "endpoint": "decode",
            "counter": 55
        },
        "data": {
            "year": 2010,
            "make": "CHEVROLET",
            "model": "COLORADO",
            "manufacturer": "GENERAL MOTORS",
            "engine": "L5, 3.7L; DOHC; 20V; MPFI",
            "trim": "LT",
            "transmission": "AUTOMATIC"
        }
    });

    res.status(200).json({ hasError: false });
};