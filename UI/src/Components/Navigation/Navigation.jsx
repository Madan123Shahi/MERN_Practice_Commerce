import { Link } from "react-router-dom";
import CategoryDrawer from "../Category/CategoryDrawer";

import {
  Home,
  Shirt,
  Smartphone,
  ShoppingBag,
  Apple,
  Sparkles,
  HeartPulse,
  Gem,
  Gamepad2,
  Tag,
} from "lucide-react";

const Navigation = () => {
  const items = [
    { name: "Home", icon: Home, color: "text-blue-600" },
    {
      name: "Fashion",
      icon: Shirt,
      color: "text-pink-600",
      subMenu: [
        { name: "men", url: "/fashion/men" },
        { name: "women", url: "/fashion/women" },
        { name: "girls", url: "/fashion/girls" },
        { name: "kids", url: "/fashion/kids" },
        { name: "boys", url: "/fashion/boys" },
      ],
    },
    { name: "Electronics", icon: Smartphone, color: "text-purple-600" },
    { name: "Bags", icon: ShoppingBag, color: "text-amber-600" },
    { name: "Groceries", icon: Apple, color: "text-green-600" },
    { name: "Beauty", icon: Sparkles, color: "text-rose-600" },
    { name: "Wellness", icon: HeartPulse, color: "text-red-600" },
    { name: "Jewellery", icon: Gem, color: "text-cyan-600" },
    { name: "Games", icon: Gamepad2, color: "text-indigo-600" },
  ];

  return (
    <nav className="border-b border-emerald-100 bg-white">
      <div className="w-full px-4 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between py-2">
          {/* LEFT - Category Drawer + Nav Links */}
          <div className="flex items-center gap-6 lg:gap-8">
            <CategoryDrawer />

            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {items.map(({ name, icon: Icon, color }) => (
                <Link
                  key={name}
                  to={`/${name.toLowerCase()}`}
                  className="group relative flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors whitespace-nowrap pb-1"
                >
                  <Icon
                    className={`h-4 w-4 ${color} group-hover:scale-110 transition-transform`}
                  />
                  {name}

                  {/* Underline on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300 ease-out"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT - Deals Button */}
          <Link
            to="/deals"
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap ml-4"
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
