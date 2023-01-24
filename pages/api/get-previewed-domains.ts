import { NextApiRequest, NextApiResponse } from "next";
import { fetchPreviewedDomains } from "../../controllers/fetchPreviewedDomains";
import { IDomainValues, ServerErrorMessage } from "../../types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IDomainValues[] | ServerErrorMessage>){
try {
    res.status(200).json(await fetchPreviewedDomains())
} catch (error) {
    res.status(500).json({error: "Internal server error"})
}
    
}