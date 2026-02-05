import { Link } from "react-router-dom";
import Logo from "../../Images/Logo.svg";
import Search from "../Search/Search";
import Navigation from "../Navigation/Navigation";

import { User, ShoppingCart, GitCompare, Heart, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ActionIcon = ({ icon: Icon, count, to }) => (
  <Link
    to={to}
    className="relative flex items-center justify-center h-10 w-10 rounded-xl hover:bg-emerald-50 transition-all duration-200"
  >
    <Icon className="h-5 w-5 text-emerald-900" />

    {count > 0 && (
      <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1.5 flex items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-semibold">
        {count}
      </Badge>
    )}
  </Link>
);

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* MAIN BAR */}
      <div className="border-b border-emerald-100">
        <div className="w-full px-4 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* LEFT */}
            <div className="flex items-center gap-3 shrink-0">
              <button className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors">
                <Menu className="h-5 w-5 text-emerald-900" />
              </button>

              <Link to="/" className="flex items-center">
                <img
                  src={Logo}
                  alt="Shahi Shopping Duniya"
                  className="h-10 sm:h-12"
                />
              </Link>
            </div>

            {/* CENTER - Search */}
            <div className="hidden md:block flex-1 max-w-2xl lg:max-w-3xl mx-4 lg:mx-6">
              <Search />
            </div>

            {/* RIGHT - Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Link
                to="/login"
                className="hidden lg:flex items-center gap-2 rounded-xl bg-emerald-600 px-4 lg:px-5 py-2 lg:py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <User className="h-4 w-4" />

                <span>
                  Login <span className="opacity-70 mx-1">|</span> Sign Up
                </span>
              </Link>

              <ActionIcon icon={GitCompare} count={2} to="/compare" />
              <ActionIcon icon={Heart} count={5} to="/wishlist" />
              <ActionIcon icon={ShoppingCart} count={3} to="/cart" />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <Search />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navigation />
    </header>
  );
};

export default Header;
