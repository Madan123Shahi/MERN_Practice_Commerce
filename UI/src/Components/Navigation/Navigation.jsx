import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { MdLocalOffer, MdHome } from "react-icons/md";
import { GiLargeDress, GiRunningShoe, GiJewelCrown } from "react-icons/gi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { IoBag } from "react-icons/io5";
import { FaAppleAlt, FaSpa } from "react-icons/fa";
import { BiSolidDiamond } from "react-icons/bi";

const Navigation = () => {
  return (
    <nav className="bg-linear-to-b from-white via-emerald-50/20 to-white border-b-2 border-emerald-100 shadow-sm">
      <div className="w-full px-6">
        <div className="flex items-center justify-between py-2">
          {/* Left: Shop by Categories - Enhanced */}
          <Button
            className="flex gap-2.5 text-white!  normal-case  rounded-2xl shadow-lg py-3! hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-0.5"
            sx={{
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #047857 0%, #065f46 100%)",
              },
            }}
          >
            <RiMenu2Fill size={20} strokeWidth={0.5} />
            <span className="tracking-wide">Shop By Categories</span>
            <LiaAngleDownSolid size={16} className="ml-1" />
          </Button>

          {/* Right: Navigation Links - Enhanced with Colorful Icons */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-all duration-300 rounded-lg hover:bg-emerald-50 group flex items-center gap-2"
            >
              <MdHome
                size={20}
                className="text-emerald-600 group-hover:scale-110 transition-transform duration-300"
              />
              Home
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-600 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            <Link
              to="/fashion"
              className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-pink-600 transition-all duration-300 rounded-lg hover:bg-pink-50 group flex items-center gap-2"
            >
              <GiLargeDress
                size={20}
                className="text-pink-500 group-hover:scale-110 transition-transform duration-300"
              />
              Fashion
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-pink-500 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            <Link
              to="/electronics"
              className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 group flex items-center gap-2"
            >
              <HiDevicePhoneMobile
                size={20}
                className="text-blue-600 group-hover:scale-110 transition-transform duration-300"
              />
              Electronics
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            <Link
              to="/bags"
              className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-amber-600 transition-all duration-300 rounded-lg hover:bg-amber-50 group flex items-center gap-2"
            >
              <IoBag
                size={20}
                className="text-amber-600 group-hover:scale-110 transition-transform duration-300"
              />
              Bags
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-600 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            <Link
              to="/footwear"
              className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-red-600 transition-all duration-300 rounded-lg hover:bg-red-50 group flex items-center gap-2"
            >
              <GiRunningShoe
                size={20}
                className="text-red-500 group-hover:scale-110 transition-transform duration-300"
              />
              Footwear
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            <Link
              to="/groceries"
              className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-green-600 transition-all duration-300 rounded-lg hover:bg-green-50 group flex items-center gap-2"
            >
              <FaAppleAlt
                size={20}
                className="text-green-600 group-hover:scale-110 transition-transform duration-300"
              />
              Groceries
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-green-600 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            <Link
              to="/beauty"
              className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-purple-600 transition-all duration-300 rounded-lg hover:bg-purple-50 group flex items-center gap-2"
            >
              <BiSolidDiamond
                size={20}
                className="text-purple-500 group-hover:scale-110 transition-transform duration-300"
              />
              Beauty
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-purple-500 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            <Link
              to="/wellness"
              className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-teal-600 transition-all duration-300 rounded-lg hover:bg-teal-50 group flex items-center gap-2"
            >
              <FaSpa
                size={20}
                className="text-teal-500 group-hover:scale-110 transition-transform duration-300"
              />
              Wellness
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-teal-500 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            <Link
              to="/jewellery"
              className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-yellow-600 transition-all duration-300 rounded-lg hover:bg-yellow-50 group flex items-center gap-2"
            >
              <GiJewelCrown
                size={20}
                className="text-yellow-600 group-hover:scale-110 transition-transform duration-300"
              />
              Jewellery
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-600 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>

            {/* Special Deals Badge - Emerald Theme */}
            <Link
              to="/deals"
              className="ml-1 flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-linear-to-r from-emerald-500 to-emerald-600 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-emerald-500/50 hover:-translate-y-0.5"
            >
              <MdLocalOffer size={18} className="animate-pulse" />
              <span>Deals</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
