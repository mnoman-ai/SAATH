let data = [];
let showAll = false;

function isLoggedIn() {
    return localStorage.getItem("saathLoggedIn") === "true";
}

function loginRequired(next) {
    if (!isLoggedIn()) {
        window.location.href = "/login/?next=" + encodeURIComponent(next);
        return false;
    }
    return true;
}

async function loadResources() {
    const box = document.getElementById("grid");
    box.innerHTML = '<div class="empty">Loading resources...</div>';

    try {
        const response = await fetch("/api/resources", { cache: "no-store" });
        if (!response.ok) throw new Error("API error");

        const result = await response.json();
        data = Array.isArray(result.resources) ? result.resources : [];
        displayResources();
    } catch (error) {
        data = [];
        box.innerHTML = '<div class="empty">Unable to load resources. Please refresh the page.</div>';
    }
}

function displayResources() {
    const box = document.getElementById("grid");
    const search = document.getElementById("search").value.trim().toLowerCase();
    const category = document.getElementById("category").value;

    const filtered = data.filter(item => {
        const text = [
            item.name,
            item.category,
            item.condition,
            item.location,
            item.description,
            item.contact,
            item.sharing
        ].filter(Boolean).join(" ").toLowerCase();

        return text.includes(search) &&
            (category === "All" || item.category === category);
    });

    const visible = showAll ? filtered : filtered.slice(0, 6);
    box.innerHTML = "";

    if (!filtered.length) {
        box.innerHTML = '<div class="empty">No resources found. Try another search or category.</div>';
    } else {
        visible.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1517842645767-c639042777db?w=700'">
                <div class="content">
                    <span class="badge">${escapeHtml(item.category)}</span>
                    <h3>${escapeHtml(item.name)}</h3>
                    <p><strong>Condition:</strong> ${escapeHtml(item.condition)}</p>
                    <p><strong>Location:</strong> ${escapeHtml(item.location)}</p>
                    <p>${escapeHtml(item.description)}</p>
                    <p><strong>Sharing:</strong> ${escapeHtml(item.sharing)}</p>
                    <button class="btn blue">Borrow / Request</button>
                </div>
            `;
            card.querySelector("button").onclick = () => requestItem(item.name);
            box.appendChild(card);
        });
    }

    const button = document.getElementById("viewAllBtn");

    if (filtered.length > 6) {
        button.style.display = "inline-block";
        button.textContent = showAll
            ? "Show 6 Resources"
            : `View All ${filtered.length} Resources`;
    } else {
        button.style.display = "none";
    }

    document.getElementById("resultCount").textContent =
        `${filtered.length} resource${filtered.length === 1 ? "" : "s"} found`;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function toggleAll() {
    showAll = !showAll;
    displayResources();
}

function showAdd() {
    if (!loginRequired("/resources/")) return;
    document.getElementById("addForm").style.display = "block";
    window.scrollTo({ top: document.getElementById("addForm").offsetTop - 80, behavior: "smooth" });
}

function hideAdd() {
    document.getElementById("addForm").style.display = "none";
}

async function addItem() {
    if (!loginRequired("/resources/")) return;

    const item = {
        name: document.getElementById("name").value.trim(),
        category: document.getElementById("cat").value,
        condition: document.getElementById("condition").value,
        location: document.getElementById("location").value.trim(),
        description: document.getElementById("description").value.trim(),
        contact: document.getElementById("contact").value.trim(),
        sharing: document.getElementById("sharing").value
    };

    if (!item.name || !item.location || !item.description || !item.contact) {
        alert("Please fill all required details.");
        return;
    }

    try {
        const response = await fetch("/api/resources", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            hideAdd();
            document.querySelectorAll("#addForm input, #addForm textarea").forEach(el => el.value = "");
            showAll = true;
            await loadResources();
        }
    } catch {
        alert("Unable to add resource. Please try again.");
    }
}

function requestItem(name) {
    if (!loginRequired("/request/?item=" + encodeURIComponent(name))) return;
    window.location.href = "/request/?item=" + encodeURIComponent(name);
}

document.getElementById("search").addEventListener("input", () => {
    showAll = false;
    displayResources();
});

document.getElementById("category").addEventListener("change", () => {
    showAll = false;
    displayResources();
});

loadResources();
