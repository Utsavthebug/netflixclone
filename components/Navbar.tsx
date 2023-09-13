import { useCallback, useEffect, useState } from "react"
import MobileMenu from "./MobileMenu"
import NavbarItem from "./NavbarItem"
import {BsChevronDown,BsSearch,BsBell} from 'react-icons/bs'
import AccountMenu from "./AccountMenu"

const TOP_OFFSET  = 66;

const Navbar = () => {
  const [showMobileMenu,setShowMobileMenu] = useState<boolean>(false)
  const [showBackground,setShowBackground] = useState<boolean>(false)
  const [showAccountMenu,setShowAccountMenu] = useState<boolean>(false)
  
  const toggleMobileMenu = useCallback(()=>{
      setShowMobileMenu((currentValue)=>!currentValue)
  },[])


  const toggleAccountMenu = useCallback(()=>{
    setShowAccountMenu((currentValue)=>!currentValue)
},[])


useEffect(()=>{
  const handleScroll = ()=>{
    if(window.screenY>=TOP_OFFSET){
      setShowBackground(true)
    }
    else{
      setShowBackground(false)
    }
  }

  window.addEventListener('scroll',handleScroll)

  //remove event listener in unmount

  return ()=>{
    window.removeEventListener('scroll',handleScroll)
  }

},[])

  
  return (
    <nav className=" w-full fixed z-40">
      <div className={`${showBackground ? 'bg-zinc-900/90':''} px-4 md:px-16 py-6 flex flex-row items-center transition duration-500`}>
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />

        <div className=" flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home"/>
          <NavbarItem label="Series"/>
          <NavbarItem label="New & Popular"/>
          <NavbarItem label="My List"/>
          <NavbarItem label="Browse by languages"/>
        </div>

      <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
        <p className="text-white text-sm">Browse</p>
        <BsChevronDown className={`${showMobileMenu?'rotate-180':'rotate-0'} text-white transition`} />
        <MobileMenu visible={showMobileMenu}/>
      </div>

      <div className=" flex flex-row ml-auto gap-7 items-center">
      <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
        <BsSearch />
      </div>

      <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
        <BsBell />
      </div>

      <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
       <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
        <img src="/images/default-blue.png" alt="Profile" />
       </div>
       <BsChevronDown className={`text-white transition ${showAccountMenu?'rotate-180':'rotate-0'}`} />

       <AccountMenu visible={showAccountMenu}/>
      </div>


      </div>

      </div>
    </nav>
  )
}

export default Navbar