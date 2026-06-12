import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div style={{display:"flex",justifyContent:"space-around"}} >
    <Link to="/">brain</Link>
    <Link to="/today">today</Link>
    <Link to="/week">week</Link>
    <Link to="/review">review</Link>

    </div>
  )
}

export default Navbar
