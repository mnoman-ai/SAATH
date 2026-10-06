let data=[];
let showAll=false;

function isLoggedIn(){
    return localStorage.getItem("saathLoggedIn")==="true";
}

function loginRequired(next){
    if(!isLoggedIn()){
        window.location.href="/login/?next="+encodeURIComponent(next);
        return false;
    }
    return true;
}

async function loadResources(){
    try{
        const response=await fetch("/api/resources");
        const result=await response.json();
        data=result.resources||[];
        displayResources();
    }catch(error){
        data=[];
        displayResources();
    }
}

function displayResources(){
    const box=document.getElementById("grid");
    const search=document.getElementById("search").value.trim().toLowerCase();
    const category=document.getElementById("category").value;

    const filtered=data.filter(item=>{
        const text=[
            item.name,item.category,item.condition,item.location,
            item.description,item.contact,item.sharing
        ].join(" ").toLowerCase();

        return text.includes(search) &&
            (category==="All" || item.category===category);
    });

    const visible=showAll ? filtered : filtered.slice(0,6);
    box.innerHTML="";

    if(!filtered.length){
        box.innerHTML='<div class="empty">No resources found. Try another search or category.</div>';
    }else{
        visible.forEach(item=>{
            const card=document.createElement("div");
            card.className="card";
            card.innerHTML=`
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <span class="badge">${item.category}</span>
                    <h3>${item.name}</h3>
                    <p><strong>Condition:</strong> ${item.condition}</p>
                    <p><strong>Location:</strong> ${item.location}</p>
                    <p>${item.description}</p>
                    <p><strong>Sharing:</strong> ${item.sharing}</p>
                    <button class="btn blue">Borrow / Request</button>
                </div>`;
            card.querySelector("button").onclick=()=>requestItem(item.name);
            box.appendChild(card);
        });
    }

    const button=document.getElementById("viewAllBtn");
    if(showAll){
        button.textContent="Show 6 Resources";
    }else{
        button.textContent=`View All ${filtered.length} Resources`;
    }
    button.style.display=filtered.length>6 ? "inline-block" : "none";
}

function toggleAll(){
    showAll=!showAll;
    displayResources();
    window.scrollTo({top:document.getElementById("grid").offsetTop-80,behavior:"smooth"});
}

function showAdd(){
    if(!loginRequired("/resources/")) return;
    document.getElementById("addForm").style.display="block";
}

function hideAdd(){
    document.getElementById("addForm").style.display="none";
}

async function addItem(){
    if(!loginRequired("/resources/")) return;

    const item={
        name:document.getElementById("name").value.trim(),
        category:document.getElementById("cat").value,
        condition:document.getElementById("condition").value,
        location:document.getElementById("location").value.trim(),
        description:document.getElementById("description").value.trim(),
        contact:document.getElementById("contact").value.trim(),
        sharing:document.getElementById("sharing").value
    };

    if(!item.name||!item.location||!item.description||!item.contact){
        alert("Please fill all required details.");
        return;
    }

    const response=await fetch("/api/resources",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(item)
    });

    const result=await response.json();
    alert(result.message);

    if(response.ok){
        hideAdd();
        document.getElementById("name").value="";
        document.getElementById("location").value="";
        document.getElementById("description").value="";
        document.getElementById("contact").value="";
        showAll=true;
        loadResources();
    }
}

function requestItem(name){
    window.location.href="/request/?item="+encodeURIComponent(name);
}

loadResources();
