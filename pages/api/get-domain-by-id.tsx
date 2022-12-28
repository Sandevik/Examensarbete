import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchDomainById } from '../../controllers/fetchDomainById'
import type { IDomainValues, ServerErrorMessage } from '../../types'


export default async function handler(req: NextApiRequest, res: NextApiResponse<IDomainValues | ServerErrorMessage>) {
    
    /* TODO: Hämta user info från req */


    try {
        const {id} = req.query
        if (typeof id == "undefined"){
            res.status(400).json({error: "id is not set"})
        }else{
            const domain = await fetchDomainById(id.toString(), user)
            if (domain){
                res.status(200).json(domain)
            }else{
                res.status(404).json({error: "Could not find domain"})
            }
        }
        
    } catch (error) {
      res.status(500).json({error: "Could not retrieve data from server"})
      console.log(error);
      
    }
}