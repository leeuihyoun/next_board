//회원가입 요청을 처리할 서버 파일

import { connectDB } from "@/util/db";
import bcrypt from 'bcrypt';

export default async function handler(req,res){
    // req.body에 받은거를 DB에 저장
    try{
        if(req.method == 'POST'){
            // 비밀번호 암호화를 ( 입력한 그대로 DB에 저장하지 않고 일정한 규칙으로 변경해서 넣기)
            // npm install bcrypt
            let hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash;

            let db = (await connectDB).db('mydb');
            await db.collection('user').insertOne(req.body);
            return res.redirect(302,'/api/auth/signin');// 로그인 페이지로 이동
        }else{
            res.status(400).json({error:'meethod only POST'});
        }
    
    }catch(error){
        res.staturs(500).json({error:'signup failed: '+ error});
    }
 
}