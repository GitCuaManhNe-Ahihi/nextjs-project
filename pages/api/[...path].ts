// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
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
  return new Promise((resolve, reject) => {
    try {
      const cookie = new Cookies(req, res, {
        secure: process.env.NODE_ENV === "production",
      });
      if(cookie.get("accessToken")){
        req.headers.authorization = `Bearer ${cookie.get("accessToken")}`;
      }
      req.headers.cookie = "";
      proxy.web(req, res, {
        target: process.env.API_URL,
        changeOrigin: true,
        selfHandleResponse: false,
      });
      proxy.once("proxyRes",()=> resolve(true));
    } catch (e) {
      reject(e);
    }
    // proxy self response
  });
}
