import { CiSearch } from "react-icons/ci";
import IconButton from "@mui/material/IconButton";

const Search = () => {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center bg-gray-100 rounded-xl p-1 border-2 border-emerald-500 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-300">
        <input
          type="text"
          placeholder="Search Products Here"
          className="w-full bg-transparent outline-none text-emerald-600 placeholder-emerald-700 px-4 py-3 rounded-xl"
        />
        <IconButton
          aria-label="Search"
          sx={{
            minWidth: "auto",
            padding: "12px",
            right: "0px",
            backgroundColor: "#059669",
            borderRadius: "8px",
            position: "absolute",
            "&:hover": {
              backgroundColor: "#047857",
            },
          }}
        >
          <CiSearch size={32} className="text-white" />
        </IconButton>
      </div>
    </div>
  );
};

export default Search;
