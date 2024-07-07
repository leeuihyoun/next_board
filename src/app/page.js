import Image from "next/image";
import styles from "./page.module.css";
import { connectDB } from "@/util/db";

export default async function Home() {
  const db = (await connectDB).db('mydb');
  let result = await db.collection('post').find().toArray();
  console.log(result);
  return (
    <div> 
      <p>{result[0]?.title}</p> 
      <p>{result[0]?.content}</p> 
 
    </div>
  );
}
// layout.js : page.js 를 감싸고 있는 main페이지
//app/page.js : Home페이지 
// global.css : layout.js에 연결된 css

//app 폴더가 '/'
//app폴데에 list폴더 만들고 page.js