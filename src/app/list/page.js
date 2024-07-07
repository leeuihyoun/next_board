import { connectDB } from "@/util/db";
import Link from "next/link";
import React from 'react';
import ListItem from "./listItem";

export default async function ListPage() {
    const db = (await connectDB).db('mydb');
    let result = await db.collection('post').find().toArray();
    result = result.map(item =>({
        ...item,
        _id: item._id.toString(),
    }));
    return (
        <div className="list-bg">
            <ListItem result={result}/>
        </div>
    )
}
// 삭제하기 버튼을 누르면 state를 변경해서 화면을 갱신
// page.js의 기본값은 'use server' : 서버 컴포넌트
// onClick , useState, ... : 클라이언트 컴포넌트 'use client'
// 클라이언트 함수가 필요한 부분은 컴포넌트로 분리 