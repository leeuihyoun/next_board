
// api/comment/new 로 요청하면 받을 API서버

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/db";

export default async function handler(req,res){
    //POST방식으로 요청이 들어오면
    if(req.method == 'POST'){
        console.log(req.body); //프론트에서 메세지 보낸걸 확인
        //JSON 문자열은 해체해서 사용한다.
        let reqObject = JSON.parse(req.body);
        console.log(reqObject);
        //res.status(200).json({msg:'받았음'});
        //댓글을 db에 저장
        //1. 대글내용 2. 계시글 id 3. 댓글작성자 이메일
        let session = await getServerSession(req,res,authOptions)
        // console.log(session);
        if(session !== null){
            let insertItem ={
                content : reqObject.comment,
                parent: ObjectId.createFromHexString(reqObject.boardId),
                email:session.user?.email

            }
            try{
                const db = (await connectDB).db('mydb')
                let result = await db.collection('comment').insertOne(insertItem);
                res.status(200).json(result)
            }catch(error){
                console.log(error);
                res.status(500).json({error:error})
            }
            
        }else{
            res.status(400).json({error:'로그인이 안되어있습니다.'})
        }
    }
}