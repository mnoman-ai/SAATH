import { put, get } from "@vercel/blob";
const options={access:"private",token:process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN};
export default async function handler(req,res){
    if(req.method!=="POST") return res.status(405).json({success:false,message:"Method not allowed"});
    try{
        const {name,email,password}=req.body;
        if(!name||!email||!password) return res.status(400).json({success:false,message:"Please fill all fields"});
        const blob=await get("users.json",options); let users=[];
        if(blob) users=JSON.parse(await new Response(blob.stream).text());
        if(users.some(u=>u.email.toLowerCase()===email.toLowerCase())) return res.status(400).json({success:false,message:"Email already registered"});
        users.push({id:Date.now(),name,email,password});
        await put("users.json",JSON.stringify(users,null,2),{...options,addRandomSuffix:false,allowOverwrite:true,contentType:"application/json"});
        res.json({success:true,message:"Registration Successful!"});
    }catch(error){res.status(500).json({success:false,message:"Server error"});}
}
