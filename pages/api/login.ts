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
    const handlerLogin: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", (chunk) => {
        body += chunk;
      });

      proxyRes.on("end", () => {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);
          const cookie = new Cookies(req, res, {
            secure: process.env.NODE_ENV === "production",
          });
          cookie.set("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(expiredAt),
          });
          (res as NextApiResponse).status(200).json({ accessToken, expiredAt });
        } catch (e) {
          (res as NextApiResponse).status(500).json({ error: e });
        }
        resolve(true);
      });
    };
    proxy.once("proxyRes", handlerLogin);
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
    // proxy self response
  });
}
