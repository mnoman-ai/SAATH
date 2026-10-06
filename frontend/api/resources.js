import { put, get } from "@vercel/blob";
const options={access:"private",token:process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN};
export default async function handler(req,res){
    try{
        const blob=await get("resources.json",options);
        let data={resources:[]};
        if(blob){data=JSON.parse(await new Response(blob.stream).text());}
        if(req.method==="GET") return res.json(data);
        if(req.method!=="POST") return res.status(405).json({message:"Method not allowed"});
        const {name,category,condition,location,description,contact,sharing}=req.body;
        if(!name||!location||!description||!contact) return res.status(400).json({message:"Please fill all required details."});
        data.resources.unshift({id:Date.now(),name:name.trim(),category,condition,location:location.trim(),description:description.trim(),contact:contact.trim(),sharing,image:"https://images.unsplash.com/photo-1517842645767-c639042777db?w=700",createdAt:new Date().toISOString()});
        await put("resources.json",JSON.stringify(data,null,2),{...options,addRandomSuffix:false,allowOverwrite:true,contentType:"application/json"});
        res.json({message:"Resource added successfully."});
    }catch(error){res.status(500).json({message:"Server error"});}
}
