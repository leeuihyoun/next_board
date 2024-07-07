/*
    localhost:3000/api/post/new로 요청하면 이 서버 파일이 실행된다.
*/

import { connectDB } from "@/util/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function writeHandler(req, res){
    //POST요청에는 body라는 곳에 데이터를 담아보냄(req.body 에 input 으로 입력한 것들이 있음)
    // console.log(req.body);
    let session = await getServerSession(req,res,authOptions);
    console.log(session);
    if(session){
        req.body.email = session.user?.email;
    }
    if(req.method == 'POST'){
        let {title, content} = req.body;
        if(title && content && req.body.email){
            try{
                const email = req.body.email;
                //이코드를 실행
                const db = (await connectDB).db('mydb');
                let result = await db.collection('post').insertOne({title,content,email}); //제목,내용,이메일
                return res.redirect(302,'/list'); //끝나면 list페이지로 이동시키기
            }catch(error){
                //try코드 실행하다 에러나면 이쪽으로 즉시 이동
                console.log('Database Error: ' , error);
                return res.status(500).json({error: '서버기능 오류'});
            }
        }else{
            return res.status(400).json({error:'빈칸은 허용되지 않습니다.'});
        }
    }else{
        return res.status(405).json({error:'Method Not Allowed'});
    }
}