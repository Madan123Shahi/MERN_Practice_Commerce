import { CiSearch } from "react-icons/ci";
import IconButton from "@mui/material/IconButton";

const Search = () => {
  return (
    <div className="relative w-full">
      <div className="flex items-center bg-emerald-50/50 rounded-xl border-2 border-emerald-200/60 transition-all duration-300 focus-within:border-emerald-500 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-emerald-500/20">
        <input
          type="text"
          placeholder="Search for products, brands, and more..."
          className="w-full bg-transparent outline-none text-emerald-950 placeholder-emerald-600/60 px-5 py-3.5 rounded-xl text-base font-medium"
        />
        <IconButton
          aria-label="Search"
          sx={{
            minWidth: "auto",
            padding: "11px",
            margin: "6px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
            "&:hover": {
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              transform: "scale(1.05)",
              boxShadow: "0 6px 16px rgba(16, 185, 129, 0.35)",
            },
          }}
        >
          <CiSearch size={24} className="text-white" strokeWidth={1} />
        </IconButton>
      </div>
    </div>
  );
};

export default Search;
