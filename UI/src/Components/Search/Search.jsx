import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Search = () => {
  return (
    <div className="relative w-full">
      <div className="flex items-center rounded-xl border-2 border-emerald-200 bg-emerald-50/50 focus-within:border-emerald-500 focus-within:bg-white transition-all">
        <input
          type="search"
          placeholder="Search products..."
          className="w-full bg-transparent px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 text-sm md:text-base outline-none placeholder:text-gray-500"
        />

        <Button
          size="icon"
          className="m-1 sm:m-1.5 h-8 w-8 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Search;
