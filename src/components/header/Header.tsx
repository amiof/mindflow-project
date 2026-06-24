import { Button, Divider } from "@mui/material"

const Header = () => {
  return (
    <>
      <div className="flex flex-row w-full h-full ">
        <div className="gap-2 w-[70%] flex flex-col justify-center ">
          <div className="px-2">
            <h1 className="text-white text-2xl">mindFlow</h1>
          </div>
          <div className="px-2 ">
            <p className="text-gray-500 text-sm">GTD + Brain Dump.Weekly Planner</p>
          </div>
        </div>
        <div className=" w-[40%] flex flex-row justify-center items-center">
          <Button>Week </Button>
          <Button>Brain</Button>
        </div>
      </div>
      <Divider variant="middle" className="bg-white" />
    </>
  )
}

export default Header
