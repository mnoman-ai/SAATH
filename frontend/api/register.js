import { put, get } from "@vercel/blob";
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
  const {name,email,password}=req.body||{};
  const n=String(name||"").trim(),e=String(email||"").trim().toLowerCase(),p=String(password||"");
  if(!n||!e||!p)return res.status(400).json({success:false,message:"Please fill all fields"});
  const users=await readUsers();
  if(users.some(u=>String(u.email||"").toLowerCase()===e))
   return res.status(400).json({success:false,message:"Email already registered"});
  users.push({id:Date.now(),name:n,email:e,password:p});
  await put("users.json",JSON.stringify(users,null,2),{...options,addRandomSuffix:false,allowOverwrite:true,contentType:"application/json"});
  return res.json({success:true,message:"Registration Successful!"});
 }catch(error){
  console.error(error);
  return res.status(500).json({success:false,message:"Server error. Please try again."});
 }
}