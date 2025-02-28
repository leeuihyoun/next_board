import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LoginBtn from "./components/LoginBtn/loginbtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nextjs App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html lang="ko">
      <body>
      <div className="navbar">
        <Link href="/" className="logo">Board</Link>
        <Link href="/list">List</Link>
        <Link href="/write">write</Link>
        <LoginBtn login={session}/>
      </div>
      {children}
      </body>
    </html>
  );
}
