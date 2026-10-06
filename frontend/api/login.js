import { get } from "@vercel/blob";
const options={access:"private",token:process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN};
export default async function handler(req,res){
    if(req.method!=="POST") return res.status(405).json({success:false,message:"Method not allowed"});
    try{
        const {email,password}=req.body;
        const blob=await get("users.json",options); let users=[];
        if(blob) users=JSON.parse(await new Response(blob.stream).text());
        const user=users.find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.password===password);
        if(!user) return res.status(401).json({success:false,message:"Wrong Email or Password!"});
        res.json({success:true,name:user.name});
    }catch(error){res.status(500).json({success:false,message:"Server error"});}
}
