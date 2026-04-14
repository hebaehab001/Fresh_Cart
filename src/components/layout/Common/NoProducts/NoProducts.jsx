import { LuPackageX } from "react-icons/lu";

export default function NoProducts({ text }) {
  return (
    <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-xl bg-sky-50 p-6 py-25">
      <div className="flex items-center justify-center w-18 h-18 rounded-full bg-sky-100 mb-4">
        <LuPackageX className="w-10 h-10 text-sky-900" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-1">{text}</h3>
    </div>
  );
}