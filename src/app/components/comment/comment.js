'use client' // 를 해야 onClick,onChange,useState, fetch 등 프론트엔드 전용 함수를 사용할수 있음
import { useEffect, useState } from 'react';
//리액트 방식을 새로고침없이 state와 ajax요청
import './comment.css';
//컴포넌트는 대문자로 시작
export default function Comment({boardId}){
    const[comment,setComment] =useState('');// input창에 입력한 내용
    const[commentList,setCommentList] = useState([]);//보여줄 댓글들
    //commentList의 내용을 요청한다.
    //페이지가 처음 로딩될때 요청
    //useEffect : 로딩될때, 언로딩될때, 갱신될때
    useEffect(()=>{
        // 서버에 댓글리스트를 요청해서 받아온다.
        //받아온 응답을 setCommentList에 담는다
        fetch('/api/comment/list?id='+boardId)
        .then(res=>res.json())
        .then(result=>{
            setCommentList(result);
        })
    },[])
    return (
        <div className="comment-container">
            <hr/>
            {
                commentList.length > 0 ? (
                    commentList.map((item,index)=>{
                        return(
                            <p key={index} >{item?.content}</p>
                            
                        )
                    })
                ) : (
                    <p>댓글 로딩 중 </p>
                )
            }
            {/*onChange : 무언가 입력될때마다 발동되는 함수*/}
            <input onChange={(e)=>{setComment(e.target.value)}} id='comment-input'/>
            {/*버튼이 클릭되면 /api/comment/new에 저장해달라고 요청을 보내자 */}
            <button onClick={()=>{
                document.getElementById('comment-input').value = '';
                fetch('/api/comment/new',{method:'POST',body: JSON.stringify({comment:comment,boardId:boardId})})
                .then((res)=>{
                    if(res.status == 200){
                        return res.json();
                    }
                    })
                .then((result)=>{
                    
                    console.log(result)
                    setComment('');
                    setCommentList(prev => [...prev,result]) // 새댓글 추가
                
                })
            }}>댓글 입력</button>
        </div>
    )
}