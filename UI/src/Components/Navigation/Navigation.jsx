import { Link } from "react-router-dom";
import {
  Home,
  Shirt,
  Smartphone,
  ShoppingBag,
  Apple,
  Gem,
  Sparkles,
  Crown,
  Tag,
} from "lucide-react";
import CategoryDrawer from "../Category/CategoryDrawer.jsx";

const NavItem = ({ to, icon: Icon, children }) => (
  <Link
    to={to}
    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
  >
    <Icon className="h-4 w-4 text-emerald-500" />
    {children}
  </Link>
);

const Navigation = () => {
  return (
    <nav className="border-b border-emerald-100 bg-white">
      <div className="flex items-center justify-between px-4 py-2 md:px-6">
        <CategoryDrawer />

        <div className="hidden lg:flex gap-6 xl:gap-8">
          <NavItem to="/" icon={Home}>
            Home
          </NavItem>
          <NavItem to="/fashion" icon={Shirt}>
            Fashion
          </NavItem>
          <NavItem to="/electronics" icon={Smartphone}>
            Electronics
          </NavItem>
          <NavItem to="/bags" icon={ShoppingBag}>
            Bags
          </NavItem>
          <NavItem to="/groceries" icon={Apple}>
            Groceries
          </NavItem>
          <NavItem to="/beauty" icon={Gem}>
            Beauty
          </NavItem>
          <NavItem to="/wellness" icon={Sparkles}>
            Wellness
          </NavItem>
          <NavItem to="/jewellery" icon={Crown}>
            Jewellery
          </NavItem>
          <NavItem to="/games" icon={Crown}>
            Games
          </NavItem>

          <Link
            to="/deals"
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
          >
            <Tag className="h-4 w-4" />
            Deals
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
