import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex gap-5">
      <Link href="/">الرئيسية</Link>
      <Link href="/test">go to test</Link>
    </div>
  );
}
