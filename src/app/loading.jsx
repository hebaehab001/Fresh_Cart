import Image from "next/image";

export default function loading() {
  return (
    <div className="h-screen w-screen bg-white/50 flex flex-col gap-4 justify-center items-center">
      <div className="flex items-center space-x-2  text-sky-900  text-3xl md:text-4xl">
        <Image src="/logo.png" width={35} height={35} alt="logo" />
        <span className="self-center whitespace-nowrap font-bold">
          Fresh Cart
        </span>
      </div>
      <div className="flex gap-4">
        <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-transparent border-t-sky-900 border-r-sky-900" />
        <p className="text-2xl font-semibold text-sky-900">Loading...</p>
      </div>
    </div>
  );
}
