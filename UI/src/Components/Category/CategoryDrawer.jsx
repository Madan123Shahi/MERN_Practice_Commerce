import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/Components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Menu, X, Plus } from "lucide-react";
import Logo from "../../Images/Logo.svg";

const categories = [
  { name: "Fashion", items: ["Men", "Women", "Girls"] },
  { name: "Electronics", items: ["Mobiles", "Laptops", "Accessories"] },
  { name: "Bags", items: ["Men Bags", "Women Bags", "Travel"] },
  { name: "Footwear", items: ["Men", "Women", "Kids"] },
  { name: "Groceries", items: ["Fruits", "Vegetables", "Daily Needs"] },
  { name: "Beauty", items: ["Makeup", "Skincare", "Haircare"] },
  { name: "Wellness", items: ["Fitness", "Supplements", "Yoga"] },
  { name: "Jewellery", items: ["Gold", "Silver", "Diamond"] },
  { name: "Games", items: ["Console", "PC", "Mobile"] },
];

const CategoryDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
          <Menu className="h-5 w-5" />
          Shop By Categories
        </button>
      </SheetTrigger>

      {/* Drawer */}
      <SheetContent
        side="left"
        className="w-80 p-0 [&>button]:hidden bg-linear-to-br from-emerald-50 via-white to-teal-50"
      >
        {/* Header */}
        <div className="relative border-b bg-linear-to-br from-emerald-600 via-emerald-500 to-teal-500 shadow-xl">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

          {/* Shared width container */}
          <div className="relative px-6">
            {/* Logo */}
            <div className="flex justify-center py-4">
              <div className="bg-white rounded-xl p-2.5 shadow-2xl">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            {/* Title + Close */}
            <div className="pb-4 flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight text-white drop-shadow-lg">
                Shop By Categories
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 transition-all duration-200 shadow-lg"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          <Accordion type="multiple" className="py-2 px-3">
            {categories.map((cat) => (
              <AccordionItem
                key={cat.name}
                value={cat.name}
                className="border-none mb-1.5"
              >
                <AccordionTrigger
                  className="
                    group flex w-full items-center justify-between
                    px-4 py-3 text-sm font-semibold rounded-xl
                    text-gray-800 bg-white shadow-md
                    hover:shadow-lg hover:bg-linear-to-r hover:from-emerald-50 hover:to-teal-50
                    transition-all duration-300 hover:no-underline
                    [&>svg]:hidden
                    data-[state=open]:bg-linear-to-r
                    data-[state=open]:from-emerald-100
                    data-[state=open]:to-teal-100
                    data-[state=open]:shadow-lg
                  "
                >
                  <span className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-data-[state=open]:bg-emerald-600" />
                    {cat.name}
                  </span>

                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-md group-hover:scale-110 transition-all duration-300">
                    <Plus className="h-3.5 w-3.5 transition-transform duration-300 group-data-[state=open]:rotate-45" />
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-1 pt-1">
                  <div className="space-y-1 pl-4 pr-2">
                    {cat.items.map((item) => (
                      <Link
                        key={item}
                        to={`/${cat.name.toLowerCase()}/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        onClick={() => setOpen(false)}
                        className="
                          block rounded-lg px-4 py-2 text-sm font-medium
                          text-gray-700 bg-white/50 backdrop-blur-sm
                          hover:bg-linear-to-r hover:from-emerald-100 hover:to-teal-100
                          hover:text-emerald-700 hover:shadow-md
                          hover:translate-x-1
                          transition-all duration-200
                        "
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          {item}
                        </span>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-500" />
      </SheetContent>
    </Sheet>
  );
};

export default CategoryDrawer;
