import { NextApiRequest,NextApiResponse } from "next";
import prismdb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";


export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method!=="GET"){
        res.status(405).end()
    }
    try {
        const {currentUser} = await serverAuth(req)

        const favoriteMovies = await prismdb.movie.findMany({
            where:{
                id:{
                    in:currentUser?.favoriteId
                }
            }
        })

        return res.status(200).json(favoriteMovies)
        
    } catch (error) {
        return res.status(400).end()
    }
}