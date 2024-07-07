
// id를 받아와서 그 아이디로 DB에서 검색해서 보여줌
// 기존의 내용을 먼저 보여즘
// 수정하기 버튼을 누르면 수정하는 페이지로 POST요청

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export default async function EditPage({params}){
    // params.slug : edit 뒤에 입력한 URL
    //{params} : 동적URL의 값을 받아오기 위해
    let session = await getServerSession(authOptions);
    const db = (await connectDB ).db('mydb');
    let result = await db.collection('post').findOne({_id : ObjectId.createFromHexString(params.slug)}); 
    console.log(params.slug);
    console.log(result);
    const resultIdString = result._id.toString();
    
    return(
        <div className="padding20">
            <h4>수정페이지</h4>
            <form action="/api/post/edit" method="POST">
                <input type="hidden" name="id" defaultValue={resultIdString}/>
                <input name="title" placeholder="글제목" defaultValue={result.title}/>
                <input name="content" placeholder="글내용" defaultValue={result.content}/>
                <input name="content" placeholder="글내용" defaultValue={result.email}/>
                <button type="submit">수정하기</button>
            </form>
        </div>
    )
}
// input 태그의 name이 key값이 됨(서버에서 받는 키값)
