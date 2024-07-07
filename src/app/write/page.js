import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"


export default async function WritePage(){
    //글 작성하기 전에 session을 검사해서
    // 로그인 중이면 원ㄹ래 return 띄워주고
    // 로그인 안애있으면 로그인 필요하다고 return 으로 띄워주기
    let session = await getServerSession(authOptions); //로그인여부 검사
    console.log(session);
    if(session){
        return(
            <div className="padding20">
                <h4>글 작성 페이지</h4>
                {/* /api/test에 post요청 */}
                <form action="/api/post/new" method="POST">
                    <input name="title" placeholder="제목을 입력하세요" className=""/>
                
                    <input name="content" placeholder="내용을 입력하세요"/>
                    
                    <button type="submit">POST요청 버튼</button>
                    
                </form>
                <br/>
                {/* /api/test에 GET요청 */}
                <form action="/api/test" method="GET">
                    <button type="submit">GET요청 버튼</button>
                </form>
            </div>
        )
    }else{
        return(
            <div>로그인이 필요해요</div>
        )   
    }
  
}

//서보통신 방식(간단하게 URL 통해서 메시지를 주고받자 REST API)
//REST API : GET,POST,DELETE, PUT
// GET요청 : 서버에 데이터를 요청할 때
// POST요청 : 서버에 데이터를 전송할 때 (보안, 길다)
