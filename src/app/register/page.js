//'use client' : 클라이언트 컴포넌트
// 'use server' : 서버 컴포넌트 (기본값)

//서버 컴포넌트에선 form 태그로 데이터를 전송 (새로 고침)
// 클라이언트 컴포넌트에선 fetch 함수로 데이터를 전송 (즉각 반영)
export default function Register(){
    return(
        <div>
            <form method="POST" action="/api/auth/signup">

                <input name="name" type="text" placeholder="이름을 입력하세요"/>
                <input name="email" type="text" placeholder="이메일을 입력하세요"/>
                <input name="password" type="password" placeholder="비밀번호를 입력하세요"/>
                <button type="submit">회원가입</button>
            </form>

        </div>
    )
}