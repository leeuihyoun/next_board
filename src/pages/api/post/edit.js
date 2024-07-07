// api/post/edit 으로 API 요청하면 동작할 서버 함수

import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";

// 받아온 input정보로 DB에 수정하고 list페이지로 이동 시키기
export default async function handler(req, res){
    //req : 요청메시지
    //res : 응답할 값을 담는 공간
    console.log(req.body);
    let {id, title, content}  = req.body;
    if(req.method == 'POST'){
        let{ id,title, content} = req.body;
        if(id && title && content ){
            //DB에서 해당 id를 찾아title과 content를 수정
            //list페이지로 이동시킴
            try{
                //수정을 위해선 updateOne({조건},{변경값})
                const db = (await connectDB).db('mydb');
                let result = await db.collection('post').updateOne(
                {_id : ObjectId.createFromHexString(id)},
                {$set: {
                    title : title,
                    content: content
                }}
            ); 
            return res.redirect(302,'/list');
            }catch(error){
                //try~catch : 상황에 따라 실패할 수 있는 함수를 사용할 때 활용(프로그램 다운 방지)
                return res.status(500).json({error: error});
            }
        }
    }else{
        
        return res.status(405).json({error:'POST요청을 보내주세요'})
    }

}