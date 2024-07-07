import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function listItemHandler(req, res)
{
    console.log("받은정보: ",req.body);
    if(req.method == 'DELETE')
    {
        try{
            let session = await getServerSession(req, res, authOptions);

            const {id, email} = req.body;
            const sessionEmail = session?.user?.email;
            
            if(sessionEmail === email || sessionEmail === 'admin123@admin.com'){
                const db = (await connectDB).db('mydb');
                let result = await db.collection('post').deleteOne(
                    {
                        _id: ObjectId.createFromHexString(id),
                    }
                );
                 console.log(result);
                res.status(200).json('삭제완료');
            }else{
                res.status(400).json({error:'계정 정보가 일치하지 않습니다'});
            }
        }catch(error){
            console.error('Database error:', error);
            res.status(500).json({ error: 'Database Error' });
        }
    }
}

// find().toArray() : 모두 가져오기
// findOne() : 하나만 가져오기