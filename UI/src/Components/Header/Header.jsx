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
    backgroundColor: "#10b981", // Emerald-500 to match logo
    color: "#fff",
    fontSize: "0.75rem",
    fontWeight: "bold",
    boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)",
  },
}));

const Header = () => {
  return (
    <header className="bg-white shadow-2xl">
      {/* Top Notification Bar */}
      <div className="py-2.5 bg-linear-to-r from-emerald-700 via-emerald-600 to-emerald-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-white text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              Get up to 50% off new season styles, limited time only
            </p>
            <nav className="flex items-center gap-8 text-white text-sm justify-end">
              <Link
                to="#"
                className="hover:text-emerald-200 transition-colors duration-300 font-medium"
              >
                Help Center
              </Link>
              <Link
                to="#"
                className="hover:text-emerald-200 transition-colors duration-300 font-medium"
              >
                Order Tracking
              </Link>
              <div className="h-4 w-px bg-emerald-400"></div>
              <Link
                to="#"
                className="hover:text-emerald-200 transition-colors duration-300 font-medium"
              >
                English
              </Link>
              <Link
                to="#"
                className="hover:text-emerald-200 transition-colors duration-300 font-medium"
              >
                USD
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Header - Full Width */}
      <div className="bg-linear-to-b from-white via-emerald-50/30 to-white border-b-2 border-emerald-100">
        <div className="w-full px-6 py-5">
          <div className="flex items-center justify-between gap-6">
            {/* Logo - Fixed Width */}
            <Link to="/" className="shrink-0 group">
              <div className="relative">
                <img
                  src={Logo}
                  alt="Shahi Shopping Duniya"
                  className="h-16 w-auto object-contain cursor-pointer transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-emerald-400/0 group-hover:bg-emerald-400/5 rounded-lg transition-all duration-300"></div>
              </div>
            </Link>

            {/* Search Bar - Expanded to take more space */}
            <div className="flex-1 mr-12">
              <Search />
            </div>

            {/* Login / Register */}
            <Link
              to="/login"
              className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2.5 text-sm hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 hover:-translate-y-0.5 shrink-0 border border-emerald-500/20"
            >
              <FiUser size={18} strokeWidth={2.5} />
              <span className="font-bold tracking-wide">Login / Sign Up</span>
            </Link>

            {/* Right Actions - More spacing */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Compare */}
              <Link to="/compare" className="group">
                <IconButton
                  aria-label="compare"
                  sx={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ecfdf5",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <StyledBadge badgeContent={2}>
                    <IoGitCompareOutline
                      size={22}
                      className="text-emerald-900 group-hover:text-emerald-600 transition-colors duration-300"
                      strokeWidth={0.5}
                    />
                  </StyledBadge>
                </IconButton>
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="group">
                <IconButton
                  aria-label="wishlist"
                  sx={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ecfdf5",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <StyledBadge badgeContent={5}>
                    <FaRegHeart
                      size={22}
                      className="text-emerald-900 group-hover:text-emerald-600 transition-colors duration-300"
                    />
                  </StyledBadge>
                </IconButton>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="group">
                <IconButton
                  aria-label="cart"
                  sx={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ecfdf5",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <StyledBadge badgeContent={3}>
                    <MdOutlineShoppingCart
                      size={22}
                      className="text-emerald-900 group-hover:text-emerald-600 transition-colors duration-300"
                    />
                  </StyledBadge>
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
