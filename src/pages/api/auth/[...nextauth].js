import NextAuth from "next-auth";

import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';   
import { connectDB } from "@/util/db";
import bcrypt from 'bcrypt';

const googleId = process.env.google_id;
const googleSecret = process.env.gogle_secret;
const githubId = process.env.github_id;
const githubSecret = process.env.github_secret;

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: googleId,    //구글 클라이언트 ID
            clientSecret: googleSecret,    //구글 클라이언트 보안 비밀번호
        }),
        GithubProvider({
            clientId: githubId,
            clientSecret: githubSecret, 
        }),
        CredentialsProvider({
            // 회원가입한 아이디로 로그인
            name : "credentials",
            credentials:{
                email:{label:"email",type:"text"},
                password:{label:"비밀번호", type:"password"},
            },
            async authorize(credentials){
                // mongoDB에 접속해서 해당 이메일이 있는지 찾고
                // 비밀번호가 있는지 찾고 만약에 찾았으면 그 유저 정보를 return
                let db = (await connectDB).db('mydb');
                let user = await db.collection('user').findOne({email:credentials.email});
                if(!user){
                    console.log('일치하는 아이디가 없습니다.')
                    return null;
                }
                //비밀번호를 bcrypt로 암호화했기 때문에 복호화해서 비교
                const checkPassword = await bcrypt.compare(credentials.password, user.password)
                if(!checkPassword){
                    console.log('비밀번호가 불일치합니다.')
                    return null;
                }
                // 이메일도 찾았고 비밀번호도  맞으니깐 유저정보 줌
                return user;
            }
        }),
    ],
    callbacks:{
        // 로그인 방식에 따라서 다르게 처리(웹 보안 로그인 방식 2가지)
        jwt: async({token, user})=>{
            // 토큰방식 로그인(Json Web Token 압축정보)
            if(user){
                token.user = {};
                token.user.name = user.name;
                token.user.email = user.email;
            }
            return token;

        },
        session: async({session, token})=>{
            //세션방식 로그인(서버에서 보관하느 사용자 정보 이용)
            session.user = token.user;
            return session;

        }
    },
    // 로그인 유지 기간
    session:{
        strategy:'jwt',
        maxAge: 1*24* 60 *60 
    },
    secret:'anything'
};

export default NextAuth(authOptions);
//구글 로그인
//https://console.cloud.google.com / -> API및 서비스 -> Oauth동의 화면(External 버튼 클릭)
//클라이언트ID와 클라이언트 보안 비밀번호 메모해놓기
//사용자 인증정보만들기 -> OAuth 2.0 클라이언트 생성 -> 웹 애플리케이션 선택 -> 이름 입력 -> 승인된 리디렉션
//URL 추가 http://localhost:3000/api/auth/callback/google


//깃 허브 로그인 (2024.06 기준)
//github 로그인 -> 우츤 프로필 아이콘 클릭 -> settings -> Developer settings -> OAuth Apps  
// -> Register a new application-> Application name 입력 -> http://localhost:3000/ 입력 
// (실제 사이트도 있으면 URI로 추가) 클라이언트ID와 클라이언트 비밀번호 메모해놓기