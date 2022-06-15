import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  name: string;
  price: number;
};
type Error = {
  [key: string]: string;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]|Error>
) {

  if(req.method !== 'GET'){
    const error:Error = {error_404:'Not found'}
    return res.status(404).json(error)
  }
  const products = [
    { id: 1, name: "TV1", price: 1000 },
    { id: 2, name: "TV2", price: 1002},
    { id: 3, name: "TV3", price: 1001 },
  ];
  return res.status(200).json(products);
}
