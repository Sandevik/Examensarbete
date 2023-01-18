
import { NextApiRequest, NextApiResponse } from 'next'
import fetchDomainGroupByIndex from '../../controllers/fetchDomainGroupByIndex';
import { IDomainValues, ServerErrorMessage } from '../../types';


export default async function handler(req: NextApiRequest, res: NextApiResponse<IDomainValues[] | ServerErrorMessage>) {
    try {
        const {index, uid} = req.body
        // Hämtar 25 domäner efter index*25
        res.status(200).json(await fetchDomainGroupByIndex(index ? index : undefined, uid))
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"})
    }
   
}
