import { get } from "@vercel/blob";
const options={access:"private",token:process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN};
async function readUsers(){
 try{
  const blob=await get("users.json",options);
  if(!blob)return [];
  const data=JSON.parse(await new Response(blob.stream).text());
  return Array.isArray(data)?data:(Array.isArray(data.users)?data.users:[]);
 }catch{return [];}
}
export default async function handler(req,res){
 if(req.method!=="POST")return res.status(405).json({success:false,message:"Method not allowed"});
 try{
  const {email,password}=req.body||{};
  const e=String(email||"").trim().toLowerCase(),p=String(password||"");
  if(!e||!p)return res.status(400).json({success:false,message:"Please fill all fields"});
  const users=await readUsers();
  const user=users.find(u=>String(u.email||"").trim().toLowerCase()===e&&String(u.password||"")===p);
  if(!user)return res.status(401).json({success:false,message:"Wrong Email or Password!"});
  return res.json({success:true,name:user.name});
 }catch(error){
  console.error(error);
  return res.status(500).json({success:false,message:"Server error. Please try again."});
 }
}