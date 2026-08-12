let counter = document.getElementById("count")
let enterImg = document.getElementById("enterImg")
let enterTitle = document.getElementById("enterTitle")
let create = document.getElementById("create")
let deleteAll = document.getElementById("deleteAll")
let themeToggle = document.getElementById("themeToggle")
let root = document.body

let mood = "create"
let tmpIndex

let data = []
if (localStorage.getItem("column") != null) {
    data = JSON.parse(localStorage.getItem("column"))
}

// CREATE / UPDATE
create.onclick = function () {
    if (enterImg.value === "" || enterTitle.value === "") {
        alert("please fill this inputs")
        return
    }

    if (mood === "create") {
        let newData = {
            img: enterImg.value,
            enterTitle: enterTitle.value,
            favorite: false
        }
        data.push(newData)
    } else {
        data[tmpIndex].img = enterImg.value
        data[tmpIndex].enterTitle = enterTitle.value
        mood = "create"
        create.innerHTML = "Create"
    }

    localStorage.setItem("column", JSON.stringify(data))
    cleanInputs()
    showData()
}

function applyTheme(theme) {
    root.classList.toggle("light", theme === "light")
    themeToggle.innerHTML = theme === "light"
        ? '<i class="fa-solid fa-moon"></i><span>Dark mode</span>'
        : '<i class="fa-solid fa-sun"></i><span>Light mode</span>'
    themeToggle.classList.toggle("bg-slate-100", theme === "light")
    themeToggle.classList.toggle("text-slate-950", theme === "light")
    themeToggle.classList.toggle("bg-slate-900/85", theme !== "light")
    themeToggle.classList.toggle("text-slate-100", theme !== "light")
}

let savedTheme = localStorage.getItem("theme") || "dark"
applyTheme(savedTheme)

themeToggle.onclick = function () {
    let nextTheme = root.classList.contains("light") ? "dark" : "light"
    localStorage.setItem("theme", nextTheme)
    applyTheme(nextTheme)
}

// SHOW DATA
function showData() {
    let table = ""
    if (data.length === 0) {
        table = `
            <tr class="text-center text-slate-500">
                <td colspan="5" class="py-16 text-base font-medium">Aucun cake disponible. Ajoutez un cake pour commencer.</td>
            </tr>
        `
    } else {
        for (let i = 0; i < data.length; i++) {
            table += `
                <tr class="group transition hover:bg-slate-900/80">
                    <td class="px-6 py-5 text-sm text-slate-300 font-medium">${i + 1}</td>

                    <td class="px-6 py-5">
                        <div class="mx-auto h-16 w-16 overflow-hidden rounded-full border border-slate-700 bg-slate-950 shadow-inner shadow-slate-950/40">
                            <img class="h-full w-full object-cover" src="${data[i].img}" alt="${data[i].enterTitle}">
                        </div>
                    </td>

                    <td class="px-6 py-5 text-slate-100">${data[i].enterTitle}</td>

                    <td class="px-6 py-5 text-center">
                        <i onclick="toggleFavorite(${i})"
                            class="fa-solid fa-heart cursor-pointer text-lg transition ${data[i].favorite ? 'text-rose-500' : 'text-slate-500 hover:text-rose-400'}"></i>
                    </td>

                    <td class="px-6 py-5">
                        <div class="flex flex-wrap gap-2 justify-start">
                            <button
                                onclick="editItem(${i})"
                                class="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700">
                                Update
                            </button>

                            <button
                                onclick="deleteItems(${i})"
                                class="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-400">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            `
        }
    }
    document.getElementById("tbody").innerHTML = table
    updateCounter()
}

// CLEAN INPUTS
function cleanInputs() {
    enterImg.value = ""
    enterTitle.value = ""
}

// COUNTER
function updateCounter() {
    counter.innerHTML = data.length
}

// DELETE ONE
function deleteItems(index) {
    let confirmDelete = confirm("Are you sure you want to delete this item?")
    if (confirmDelete) {
        data.splice(index, 1)
        localStorage.setItem("column", JSON.stringify(data))
        showData()
    }
}

// DELETE ALL
deleteAll.onclick = function () {
    let confirmDeleteAll = confirm("Are you sure you want to delete all items?")
    if (confirmDeleteAll) {
        data = []
        localStorage.removeItem("column")
        showData()
    }
}

// FAVORITE
function toggleFavorite(index) {
    data[index].favorite = !data[index].favorite
    localStorage.setItem("column", JSON.stringify(data))
    showData()
}

function editItem(index) {
    alert("Vous êtes en mode modification")

    enterImg.value = data[index].img
    enterTitle.value = data[index].enterTitle

    mood = "update"
    tmpIndex = index
    create.innerHTML = "Update"
}


showData()
updateCounter()