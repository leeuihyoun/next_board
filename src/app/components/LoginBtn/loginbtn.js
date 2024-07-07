'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import "./loginbtn.css"

export default function LoginBtn({ login }) {
    console.log(login);
    return (
        <>
            {
                !login ? (
                    <>
                        <button onClick={() => { signIn() }}>로그인</button>
                    
                    </>
                ) : (
                    <>
                        <button onClick={() => { signOut() }}>로그아웃</button>
                    </>
                )
            }
            {
                !login ?(
                    <Link href='/register' className="user-signup" >회원가입</Link>
                ) : (
                    <span>{login?.user?.name}</span>
                )
               
            }
        </>
    );
}
