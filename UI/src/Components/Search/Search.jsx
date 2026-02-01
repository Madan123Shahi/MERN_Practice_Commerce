import Button from '@mui/material/Button';
import { CiSearch } from "react-icons/ci";
const Search = () => {
  return (
    <div className="w-full max-w-2xl bg-gray-100 rounded-xl p-4 relative">
      <input
        placeholder="Search Products Here"
        className="outline-none placeholder-emerald-500 w-full text-emerald-500"
      />
       <Button className="absolute"><CiSearch/></Button>
    </div>
  );
};

export default Search;
