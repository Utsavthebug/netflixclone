import {NextApiRequest,NextApiResponse} from 'next'
import prismdb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try {
    if(req.method!=="GET")
    {
        return res.status(405).end()
    }
        await serverAuth(req)

        const movieCount = await prismdb.movie.count()
        const randomIndex = Math.floor(Math.random()*movieCount)

        const randomMovies = await prismdb.movie.findMany({
            take:1,
            skip:randomIndex
        })

        return res.status(200).json(randomMovies[0])
        
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }


}