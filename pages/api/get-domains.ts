import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllDomains } from '../../controllers/fetchAllDomains';
import type { IDomainValues , ServerErrorMessage }  from '../../types'

export default async function handler(req: NextApiRequest, res: NextApiResponse<IDomainValues[] | ServerErrorMessage>) {
  try {
    const {uid} = req.body;
    res.status(200).json(await fetchAllDomains(uid));
  } catch (error) {
    res.status(500).json({error: "Could not retrieve data"})
  }
}

