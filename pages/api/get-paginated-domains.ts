
import { NextApiRequest, NextApiResponse } from 'next'
import fetchDomainGroupByIndex from '../../controllers/fetchDomainGroupByIndex';
import { IDomainValues, ServerErrorMessage } from '../../types';


export default async function handler(req: NextApiRequest, res: NextApiResponse<IDomainValues[] | ServerErrorMessage>) {
    try {
        const {lastDomain, uid} = req.body        
        // Hämtar 10 domäner efter id:t på senaste domänen
        res.status(200).json(await fetchDomainGroupByIndex(lastDomain ? lastDomain : undefined, uid))
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"})
    }
   
}
