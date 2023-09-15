import { NextApiRequest,NextApiResponse } from "next";
import prismdb from '@/lib/prismadb'
import { without } from "lodash";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try  {
        if(req.method==="POST"){
        const {currentUser} = await serverAuth(req,res)
        const {movieId}  = req.body

        const existingMovie = await prismdb.movie.findUnique({
            where:{
                id:movieId
            }
        })

        if(!existingMovie){
            throw new Error('Invalid ID')
        }

        const user = await prismdb.user.update({
            where : {
                email : currentUser.email || '',
            },
            data:{
                favoriteId:{
                    push:movieId
                }
            }
        })

        return res.status(200).json(user)
        }

        if(req.method==='DELETE'){
        const {currentUser} = await serverAuth(req,res)

        const {movieId} = req.body
            
        const existingMovie = await prismdb.movie.findUnique({
            where:{
                id:movieId
            }
        })

        if(!existingMovie){
            throw new Error('Invalid ID')
        }

        const updatedFavoriteIds = without(currentUser.favoriteId,movieId)

        const updatedUser = await prismdb.user.update({
            where:{
                email : currentUser.email || ''
            },
            data:{
                favoriteId : updatedFavoriteIds
            }
        })

        return res.status(200).json(updatedUser)
        }

     return res.status(405).end()

        
    } catch (error) {
        res.status(400).end()   
    }
}