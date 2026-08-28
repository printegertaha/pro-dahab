import Link from "next/link";

export default function Navbar_threads() {
  return (
    <div className="flex justify-between px-[5%] bg-gray-700 p-2 ">
      <Link href={"/threads"}>ثريدز</Link>
      <Link href={"/"}>موقع آخر</Link>
    </div>
  );
}
