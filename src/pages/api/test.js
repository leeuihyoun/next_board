//localhost:3000/api/test 서버

export default function handler(req,res){
    if(req.method == 'POST'){
        return res.status(200).json('POST 완료')
    }else if(req.method == 'GET'){
        let datetime = new Date();
        return res.status(200).json(datetime + 'GET 완료')
    }
}