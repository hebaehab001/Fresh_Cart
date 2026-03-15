import { SearchX } from "lucide-react";

export default function NoProducts({ text }) {
  return (
    <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-xl bg-sky-50 p-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 mb-4">
        <SearchX className="w-8 h-8 text-sky-900" />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-1">
        No products found
      </h3>

      <p className="text-sm text-gray-500 text-center max-w-md">{text}</p>
    </div>
  );
}