import { Link } from "react-router-dom";
import Logo from "../../Images/Logo.svg";
import Search from "../Search/Search";

const Header = () => {
  return (
    <header>
      <div className="py-2 bg-primary">
        <div className="container">
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
      <div className="container py-3">
        <div className="flex items-center justify-between">
          <img
            src={Logo}
            alt="Shahi Shopping Duniya"
            className="h-14 w-auto object-contain shrink-0"
          />
          <div className="flex-1">
            <Search />
          </div>
          <div>Col1</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
