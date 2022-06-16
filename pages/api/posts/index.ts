import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
const dotenv = require("dotenv");
dotenv.config();

type Data = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};
type Error = {
  [key: string]: string;
}

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]|Error>
) {

  return new Promise((resolve, reject) => {
    try{
      proxy.web(req, res, {
        target: process.env.API_URL,
        changeOrigin: true,
        selfHandleResponse: false,})
      proxy.once("proxyRes",()=> resolve(true));
    }
    catch(e){
      reject(e);
    }
  })
}
