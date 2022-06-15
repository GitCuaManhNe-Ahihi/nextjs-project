import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: number,
  name: string,
  decripton : string,
  price : number,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const _id = req.query.productId;
  //Có thể fecth data từ database
  res.status(200).json([{ id:+_id,name: 'TV', decripton : 'TV', price : 100 }])
}
