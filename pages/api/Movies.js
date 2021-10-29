// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Data from '../../Db/Movies'
export default function handler(req, res) {
  res.status(200).json(Data)
}
