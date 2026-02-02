// import Button from "@mui/material/Button";
import { CiSearch } from "react-icons/ci";
import IconButton from "@mui/material/IconButton";

const Search = () => {
  return (
    <div className="relative w-full max-w-2xl bg-gray-100 rounded-xl p-4 flex items-center">
      <input
        type="text"
        placeholder="Search Products Here"
        className="w-full bg-transparent outline-none text-emerald-600 placeholder-emerald-500 pr-16"
      />

      <IconButton
        aria-label="Search"
        sx={{
          minWidth: "auto", // ✅ important
          padding: "10px",
          position: "absolute",
          right: "2px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#059669",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#047857",
          },
        }}
      >
        <CiSearch size={32} className="text-white" />
      </IconButton>
    </div>
  );
};

export default Search;
