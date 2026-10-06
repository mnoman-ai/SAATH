let data = [];
async function loadResources(){
    try{
        const response = await fetch("/api/resources");
        const result = await response.json();
        data = result.resources || [];
        displayResources();
    }catch(error){
        data = [];
        displayResources();
    }
}
function displayResources(){
    const box=document.getElementById("grid");
    const search=document.getElementById("search").value.toLowerCase();
    const category=document.getElementById("category").value;
    const filtered=data.filter(item=>{
        const text=(item.name+" "+item.description).toLowerCase();
        return text.includes(search) && (category==="All" || item.category===category);
    });
    box.innerHTML="";
    if(!filtered.length){box.innerHTML='<div class="empty">No resources found.</div>';return;}
    filtered.forEach(item=>{
        box.innerHTML+=`<div class="card"><img src="${item.image}" alt="${item.name}"><div class="content"><span class="badge">${item.category}</span><h3>${item.name}</h3><p><strong>Condition:</strong> ${item.condition}</p><p><strong>Location:</strong> ${item.location}</p><p>${item.description}</p><p><strong>Sharing:</strong> ${item.sharing}</p><button class="btn blue" onclick="requestItem('${item.name.replace(/'/g,"\\'")}')">Borrow / Request</button></div></div>`;
    });
}
function showAdd(){document.getElementById("addForm").style.display="block"}
function hideAdd(){document.getElementById("addForm").style.display="none"}
async function addItem(){
    const item={name:document.getElementById("name").value.trim(),category:document.getElementById("cat").value,condition:document.getElementById("condition").value,location:document.getElementById("location").value.trim(),description:document.getElementById("description").value.trim(),contact:document.getElementById("contact").value.trim(),sharing:document.getElementById("sharing").value};
    if(!item.name||!item.location||!item.description||!item.contact){alert("Please fill all required details.");return;}
    const response=await fetch("/api/resources",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(item)});
    const result=await response.json();alert(result.message);if(response.ok){hideAdd();document.getElementById("name").value="";document.getElementById("location").value="";document.getElementById("description").value="";document.getElementById("contact").value="";loadResources();}
}
function requestItem(name){window.location.href="/request/?item="+encodeURIComponent(name)}
loadResources();
