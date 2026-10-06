let data=[];
let showAll=false;

const demoResources=[{"id":"demo-01","name":"Scientific Calculator","category":"Academic","condition":"Good","location":"College Campus","description":"Scientific calculator for engineering mathematics and examinations.","sharing":"Available for borrowing.","image":"https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=900","owner":{"name":"Aarav Sharma","role":"B.Tech Student","location":"College Campus","contact":"9000010001"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-02","name":"Engineering Mathematics Book","category":"Books","condition":"Very Good","location":"Hostel Block A","description":"Reference book for engineering mathematics and semester preparation.","sharing":"Borrow Only","image":"https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=900","owner":{"name":"Riya Patil","role":"Engineering Student","location":"Hostel Block A","contact":"9000010002"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-03","name":"Java Programming Book","category":"Books","condition":"Very Good","location":"Hostel","description":"Java programming reference for OOP and practical work.","sharing":"Available for borrowing.","image":"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=900","owner":{"name":"Aditya Kulkarni","role":"CSE Student","location":"Hostel","contact":"9000010003"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-04","name":"Laptop","category":"Electronics","condition":"Very Good","location":"College Campus","description":"Laptop available for programming, assignments and academic work.","sharing":"Borrow Only","image":"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900","owner":{"name":"Sneha Deshmukh","role":"CSE Student","location":"College Campus","contact":"9000010004"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-05","name":"Cricket Bat","category":"Sports","condition":"Good","location":"Sports Ground","description":"Cricket bat available for practice and college matches.","sharing":"Available for sharing.","image":"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=900","owner":{"name":"Rahul Jadhav","role":"Student Volunteer","location":"Sports Ground","contact":"9000010005"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-06","name":"School Bag","category":"Household","condition":"Good","location":"Community Center","description":"Clean school bag suitable for daily use.","sharing":"Free to Take","image":"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900","owner":{"name":"Neha More","role":"Volunteer","location":"Community Center","contact":"9000010006"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-07","name":"Scientific Calculator FX-991","category":"Academic","condition":"New","location":"College Campus","description":"Scientific calculator with standard engineering functions.","sharing":"Available for borrowing.","image":"https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=900","owner":{"name":"Vivek Joshi","role":"B.Tech Student","location":"College Campus","contact":"9000010007"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-08","name":"Physics Reference Book","category":"Books","condition":"Good","location":"Library Area","description":"Physics reference material for engineering students.","sharing":"Borrow Only","image":"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900","owner":{"name":"Pooja Thakur","role":"Student Volunteer","location":"Library Area","contact":"9000010008"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-09","name":"Data Structures Book","category":"Books","condition":"Very Good","location":"Hostel Block B","description":"Data Structures reference book covering core concepts and algorithms.","sharing":"Available for borrowing.","image":"https://images.unsplash.com/photo-1532012197267-da84d127e765?w=900","owner":{"name":"Kunal Pawar","role":"CSE Student","location":"Hostel Block B","contact":"9000010009"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-10","name":"USB Keyboard","category":"Electronics","condition":"Good","location":"College Campus","description":"USB keyboard useful for desktop and laptop work.","sharing":"Available for sharing.","image":"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900","owner":{"name":"Manish Kale","role":"Student Volunteer","location":"College Campus","contact":"9000010010"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-11","name":"Wireless Mouse","category":"Electronics","condition":"Very Good","location":"Hostel","description":"Wireless mouse for study and programming work.","sharing":"Borrow Only","image":"https://images.unsplash.com/photo-1527814050087-3793815479db?w=900","owner":{"name":"Ishita Wankhede","role":"CSE Student","location":"Hostel","contact":"9000010011"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-12","name":"Football","category":"Sports","condition":"Good","location":"Sports Ground","description":"Football available for practice and recreational games.","sharing":"Available for sharing.","image":"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900","owner":{"name":"Akash Shinde","role":"Sports Volunteer","location":"Sports Ground","contact":"9000010012"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-13","name":"Badminton Racket","category":"Sports","condition":"Very Good","location":"College Campus","description":"Badminton racket available for practice sessions.","sharing":"Borrow Only","image":"https://images.unsplash.com/photo-1613918431703-aa50889e3be5?w=900","owner":{"name":"Tanvi Borkar","role":"Student Volunteer","location":"College Campus","contact":"9000010013"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-14","name":"Backpack","category":"Household","condition":"Good","location":"Community Center","description":"Spacious backpack suitable for college use.","sharing":"Free to Take","image":"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900","owner":{"name":"Om Deshpande","role":"Volunteer","location":"Community Center","contact":"9000010014"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-15","name":"Extension Board","category":"Electronics","condition":"Good","location":"Hostel","description":"Multi-socket extension board for a study setup.","sharing":"Available for borrowing.","image":"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900","owner":{"name":"Harsh Gupta","role":"Hostel Student","location":"Hostel","contact":"9000010015"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-16","name":"Drawing Sheet Set","category":"Academic","condition":"New","location":"College Campus","description":"Drawing sheets for engineering graphics and practical work.","sharing":"Free to Take","image":"https://images.unsplash.com/photo-1509223197845-458d87318791?w=900","owner":{"name":"Sakshi Raut","role":"Engineering Student","location":"College Campus","contact":"9000010016"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-17","name":"Screwdriver Set","category":"Tools","condition":"Good","location":"Community Center","description":"Basic screwdriver set for small repairs and projects.","sharing":"Available for sharing.","image":"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900","owner":{"name":"Nikhil Bhagat","role":"Volunteer","location":"Community Center","contact":"9000010017"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-18","name":"Study Lamp","category":"Household","condition":"Very Good","location":"Hostel","description":"LED study lamp suitable for night study.","sharing":"Borrow Only","image":"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900","owner":{"name":"Ananya Joshi","role":"Student Volunteer","location":"Hostel","contact":"9000010018"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-19","name":"USB-C Charger","category":"Electronics","condition":"Good","location":"College Campus","description":"USB-C charger for compatible phones and devices.","sharing":"Available for borrowing.","image":"https://images.unsplash.com/photo-1609592424843-27c7e3f7a1e1?w=900","owner":{"name":"Yash Tiwari","role":"B.Tech Student","location":"College Campus","contact":"9000010019"},"createdAt":"2026-10-07T00:00:00.000Z"},{"id":"demo-20","name":"Notebook Set","category":"Academic","condition":"New","location":"Community Center","description":"Unused notebooks suitable for school and college students.","sharing":"Free to Take","image":"https://images.unsplash.com/photo-1517842645767-c639042777db?w=900","owner":{"name":"Meera Sable","role":"Volunteer","location":"Community Center","contact":"9000010020"},"createdAt":"2026-10-07T00:00:00.000Z"}];

function isLoggedIn(){return localStorage.getItem("saathLoggedIn")==="true";}

function loginRequired(next){
    if(!isLoggedIn()){
        window.location.href="/login/?next="+encodeURIComponent(next);
        return false;
    }
    return true;
}

async function loadResources(){
    const box=document.getElementById("grid");
    box.innerHTML='<div class="empty">Loading resources...</div>';
    try{
        const response=await fetch("/api/resources",{cache:"no-store"});
        if(!response.ok)throw new Error("API error");
        const result=await response.json();
        data=Array.isArray(result.resources)&&result.resources.length?result.resources:demoResources;
    }catch{
        data=demoResources;
    }
    displayResources();
}

function displayResources(){
    const box=document.getElementById("grid");
    const search=document.getElementById("search").value.trim().toLowerCase();
    const category=document.getElementById("category").value;

    const filtered=data.filter(item=>{
        const owner=item.owner||{};
        const text=[
            item.name,item.category,item.condition,item.location,item.description,
            item.contact,item.sharing,owner.name,owner.role,owner.location,owner.contact
        ].filter(Boolean).join(" ").toLowerCase();
        return text.includes(search)&&(category==="All"||item.category===category);
    });

    const visible=showAll?filtered:filtered.slice(0,6);
    box.innerHTML="";

    if(!filtered.length){
        box.innerHTML='<div class="empty">No resources found. Try another search or category.</div>';
    }else{
        visible.forEach(item=>{
            const card=document.createElement("div");
            card.className="card";
            card.innerHTML=`
                <img src="${safe(item.image)}" alt="${safe(item.name)}" loading="lazy">
                <div class="content">
                    <span class="badge">${safe(item.category)}</span>
                    <h3>${safe(item.name)}</h3>
                    <p><strong>Condition:</strong> ${safe(item.condition)}</p>
                    <p><strong>Location:</strong> ${safe(item.location)}</p>
                    <p>${safe(item.description)}</p>
                    <button class="btn details-btn">View Full Details</button>
                    <button class="btn blue request-btn">Borrow / Request</button>
                </div>`;
            card.querySelector(".details-btn").onclick=e=>{e.stopPropagation();showDetails(item);};
            card.querySelector(".request-btn").onclick=e=>{e.stopPropagation();requestItem(item.name);};
            card.onclick=()=>showDetails(item);
            box.appendChild(card);
        });
    }

    const button=document.getElementById("viewAllBtn");
    button.style.display=filtered.length>6?"inline-block":"none";
    if(filtered.length>6)button.textContent=showAll?"Show 6 Resources":`View All ${filtered.length} Resources`;
    document.getElementById("resultCount").textContent=`${filtered.length} resource${filtered.length===1?"":"s"} found`;
}

function safe(value){
    return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

function showDetails(item){
    const owner=item.owner||{};
    document.getElementById("detailTitle").textContent=item.name;
    document.getElementById("detailBody").innerHTML=`
        <img class="detail-image" src="${safe(item.image)}" alt="${safe(item.name)}">
        <span class="badge">${safe(item.category)}</span>
        <h2>${safe(item.name)}</h2>
        <p style="margin-top:8px;color:#555;line-height:1.6">${safe(item.description)}</p>
        <div class="detail-grid">
            <div class="detail-box"><small>Condition</small><strong>${safe(item.condition)}</strong></div>
            <div class="detail-box"><small>Sharing Status</small><strong>${safe(item.sharing)}</strong></div>
            <div class="detail-box"><small>Location</small><strong>${safe(item.location)}</strong></div>
            <div class="detail-box"><small>Resource ID</small><strong>${safe(item.id)}</strong></div>
        </div>
        <div class="owner">
            <h3>Owner Details</h3>
            <div class="detail-grid">
                <div class="detail-box"><small>Name</small><strong>${safe(owner.name||"Demo Owner")}</strong></div>
                <div class="detail-box"><small>Role</small><strong>${safe(owner.role||"SAATH Community Member")}</strong></div>
                <div class="detail-box"><small>Location</small><strong>${safe(owner.location||item.location)}</strong></div>
                <div class="detail-box"><small>Contact</small><strong>${safe(owner.contact||item.contact||"9000000000")}</strong></div>
            </div>
            <p style="font-size:12px;color:#777;margin-top:10px">Demo owner details for presentation.</p>
        </div>
        <div class="modal-actions">
            <button class="btn details-btn" onclick="closeDetails()">Close</button>
            <button class="btn blue" onclick="requestItem(${JSON.stringify(item.name)})">Borrow / Request</button>
        </div>`;
    document.getElementById("detailModal").classList.add("show");
}

function closeDetails(event){
    if(!event||event.target.id==="detailModal")document.getElementById("detailModal").classList.remove("show");
}

function toggleAll(){showAll=!showAll;displayResources();}

function showAdd(){
    if(!loginRequired("/resources/"))return;
    document.getElementById("addForm").style.display="block";
    window.scrollTo({top:document.getElementById("addForm").offsetTop-80,behavior:"smooth"});
}

function hideAdd(){document.getElementById("addForm").style.display="none";}

async function addItem(){
    if(!loginRequired("/resources/"))return;
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
        alert("Please fill all required details.");return;
    }
    try{
        const response=await fetch("/api/resources",{
            method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(item)
        });
        const result=await response.json();
        alert(result.message);
        if(response.ok){
            hideAdd();
            document.querySelectorAll("#addForm input,#addForm textarea").forEach(el=>el.value="");
            showAll=true;
            await loadResources();
        }
    }catch{alert("Unable to add resource. Please try again.");}
}

function requestItem(name){
    if(!loginRequired("/request/?item="+encodeURIComponent(name)))return;
    window.location.href="/request/?item="+encodeURIComponent(name);
}

document.getElementById("search").addEventListener("input",()=>{showAll=false;displayResources();});
document.getElementById("category").addEventListener("change",()=>{showAll=false;displayResources();});
loadResources();
