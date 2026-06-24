import { Link } from "react-router-dom"
import { Brain } from "lucide-react"
import { CalendarDays } from "lucide-react"
import { ClipboardCheck } from "lucide-react"
import { RotateCcw } from "lucide-react"
import { useState } from "react"
import clsx from "clsx"

const Navbar = () => {

 const [selectPage,setSelectPage]= useState<string>("brain")

  return (
    <nav className="fixed bottom-10 left-0 right-0 z-50 flex justify-center h-18">
      <div
        className="rounded-full w-[90%] h-full flex items-center justify-around border border-white/10 bg-[#1D2435]/60 backdrop-blur-xs px-4">

        <div className={"flex flex-col gap-1 justify-center  h-full  items-center "} onClick={()=>setSelectPage("brain")}>
          <Link to="/">
            <Brain color={selectPage==="brain"?"#21D1EE":"white"} size={30} style={{ marginTop: "5px" }} />
          </Link>
          <p className={clsx("text-sx",selectPage==="brain"?"text-[#21D1EE]":"text-white")} >brain</p>
        </div>

        <div className={"flex flex-col gap-1 justify-center  h-full  items-center "}  onClick={()=>setSelectPage("today")} >
          <Link to="/today" className="text-white font-medium hover:text-gray-300">
            <ClipboardCheck color={ selectPage==="today"?"#21D1EE":"white"} size={30} style={{ marginTop: "5px" }} />
          </Link>
          <p className={clsx("text-sx",selectPage==="today"?"text-[#21D1EE]":"text-white")} >today</p>
        </div>

        <div className={"flex flex-col gap-1 justify-center  h-full  items-center "}  onClick={()=>setSelectPage("week")}>
          <Link to="/week">
            <CalendarDays color={selectPage==="week"?"#21D1EE":"white"} size={30} style={{ marginTop: "5px" }} />
          </Link>
          <p className={clsx("text-sx",selectPage==="week"?"text-[#21D1EE]":"text-white")} >week</p>
        </div>


        <div>
          <Link to="/review" className="text-white font-medium hover:text-gray-300"  onClick={()=>setSelectPage("review")}>
            <RotateCcw color={selectPage==="review"?"#21D1EE":"white"} size={30} style={{ marginTop: "5px" }} />
          </Link>
          <p className={clsx("text-sx",selectPage==="review"?"text-[#21D1EE]":"text-white")}>review</p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
