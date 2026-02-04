import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Search = () => {
  return (
    <div className="relative w-full">
      <div className="flex items-center rounded-xl border-2 border-emerald-200 bg-emerald-50 focus-within:border-emerald-500">
        <input
          placeholder="Search products..."
          className="w-full bg-transparent px-4 py-2 md:px-5 md:py-3 text-sm md:text-base outline-none"
        />
        <Button size="icon" className="m-1.5 rounded-xl bg-emerald-600">
          <SearchIcon className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Search;
