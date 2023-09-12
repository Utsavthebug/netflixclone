import userCurrentUser from "@/hooks/userCurrentUser"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

export async function getServerSideProps(context:NextPageContext){
    const session = getSession(context)

    if(!session){
        return {
            redirect:'/auth',
            permanent:false
        }
    }

    return {
        props:{}
    }
}

const Profiles = () => {
    const {data:user} = userCurrentUser()
    const router = useRouter()
      return (
    <div className=" flex items-center h-full justify-center">
        <div className="flex flex-col">
            <h1 className=" text-3xl md:text-6xl text-white text-center">Who is watching ?</h1>
            <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={()=>router.push('/') }>
                        <div className="group flex-row w-44 mx-auto">
                           <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer 
                           overflow-hidden group-hover:border-white
                           ">
                            <img src="/images/default-blue.png" alt="Profile" />
                            </div> 
                        
                        <div className=" mt-4 text-gray-400 text-2xl text-center  group-hover:text-white">
                            {user?.name}
                        </div>

                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Profiles