import { Grid } from "@mui/material"
import Header from "./components/header/Header"
import Navbar from "./components/navbar/Navbar"
import { Route, Routes } from "react-router-dom"
import Brain from "./components/Routes/Brain"
import Week from "./components/Routes/Week"
import Today from "./components/Routes/Today"
import Review from "./components/Routes/Review"

function App() {
  return (
    <Grid
      container
      // className="bg-slate-800"
      sx={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        background:"#111A2C"
      }}
    >
      <Grid
        size={12}
        sx={{ height: "10%" }}
      >
        <Header />
      </Grid>
      
      <Grid
        size={12}
        sx={{
          height: "89%",
          overflow: "auto",
        }}
      >
          <Routes>
            <Route path="/" element={<Brain />} />
            <Route path="/week" element={<Week />} />
            <Route path="/today" element={<Today />} />
            <Route path="/review" element={<Review />} />
          </Routes>
      </Grid>
      
      <Grid
        size={12}
        sx={{ height: "1%" }}
      >
          <Navbar />
      </Grid>
    </Grid>
  )
}

export default App
