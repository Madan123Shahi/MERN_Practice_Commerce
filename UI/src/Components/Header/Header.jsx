import { Link } from "react-router-dom";
import Logo from "../../Images/Logo.svg";
import Search from "../Search/Search";
import Navigation from "../Navigation/Navigation";

import { User, ShoppingCart, GitCompare, Heart, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const ActionIcon = ({ icon: Icon, count, label, to }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Link
        to={to}
        className="relative rounded-xl p-3 transition-all hover:bg-emerald-50 hover:-translate-y-0.5"
      >
        <Icon className="h-5 w-5 text-emerald-900" />
        {count > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full bg-emerald-500 px-1 text-xs font-bold text-white">
            {count}
          </Badge>
        )}
      </Link>
    </TooltipTrigger>
    <TooltipContent side="bottom" sideOffset={6}>
      {label}
    </TooltipContent>
  </Tooltip>
);

const Header = () => {
  return (
    <header className="bg-white shadow-xl">
      {/* Top Bar */}
      <div className="hidden sm:block bg-linear-to-r from-emerald-700 via-emerald-600 to-emerald-700 py-2">
        <div className="container mx-auto flex justify-between px-4 text-sm text-white">
          <p>🔥 Get up to 50% off new season styles</p>
          <nav className="flex gap-6">
            <Link>Help Center</Link>
            <Link>Order Tracking</Link>
            <Link>English</Link>
            <Link>USD</Link>
          </nav>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-emerald-100">
        <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:gap-6">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={Logo} alt="Logo" className="h-12 md:h-16" />
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1">
            <Search />
          </div>

          {/* Right */}
          <div className="flex items-center justify-between gap-2 md:justify-end md:gap-4">
            {/* Mobile Menu */}
            <button className="md:hidden rounded-xl p-3 hover:bg-emerald-50">
              <Menu className="h-5 w-5 text-emerald-900" />
            </button>

            {/* Login */}
            <Link
              to="/login"
              className="hidden lg:flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
            >
              <User className="h-5 w-5" />
              Login / Sign Up
            </Link>

            <Link
              to="/login"
              className="lg:hidden rounded-xl p-3 hover:bg-emerald-50"
            >
              <User className="h-5 w-5 text-emerald-900" />
            </Link>

            {/* Icons */}
            <div className="flex gap-1 md:gap-2">
              <ActionIcon
                to="/compare"
                icon={GitCompare}
                count={2}
                label="Compare"
              />
              <ActionIcon
                to="/wishlist"
                icon={Heart}
                count={5}
                label="Wishlist"
              />
              <ActionIcon
                to="/cart"
                icon={ShoppingCart}
                count={3}
                label="Cart"
              />
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
