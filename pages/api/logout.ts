// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import dotenv from "dotenv";
import Cookies from "cookies";
dotenv.config();

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ error_404: "Not found" });
  }
  return new Promise((resolve, reject) => {
    const cookie = new Cookies(req, res);
    cookie.set("accessToken");
    res.status(200).json("logout successfully");
  });

}
