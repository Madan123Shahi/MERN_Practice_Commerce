import { Link } from "react-router-dom";
import Logo from "../../Images/Logo.svg";
import Search from "../Search/Search";
import { FiUser } from "react-icons/fi";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#ff1744", // 🔴 badge background
    color: "#fff", // ⚪ badge number color
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
}));

const Header = () => {
  return (
    <header>
      {/* Top Notification Bar */}
      <div className="py-2 bg-primary">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              Get up to 50% off new season styles, limited time only
            </p>
            <nav className="flex items-center gap-8 text-white text-sm justify-end">
              <Link to="#">Help Center</Link>
              <Link to="#">Order Tracking</Link>
              <Link to="#">English</Link>
              <Link to="#">USD</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src={Logo}
              alt="Shahi Shopping Duniya"
              className="h-14 w-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 hover:scale-105 transition-transform">
            <Search />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 h-12 bg-emerald-600 rounded-2xl text-white p-7 hover:bg-emerald-700 hover:scale-105 transition duration-300">
            {/* Login / Register */}
            <Link
              to="/login"
              className="font-medium flex items-center gap-1 text-base"
            >
              <FiUser size={24} />
              <span>Login</span>
              <span>|</span>
              <span>Sign Up</span>
            </Link>

            {/* Compare */}
            <Link to="/wishlist">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} className="text-white">
                  <IoGitCompareOutline />
                </StyledBadge>
              </IconButton>
            </Link>

            {/* Wishlist */}
            <Link to="/cart" className="text-white">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} className="text-white">
                  <FaRegHeart />
                </StyledBadge>
              </IconButton>
            </Link>
            {/* Cart */}
            <Link to="/cart" className="text-white">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} className="text-white">
                  <MdOutlineShoppingCart />
                </StyledBadge>
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
