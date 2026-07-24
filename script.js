let counter = document.getElementById("count")
let enterImg = document.getElementById("enterImg")
let enterTitle = document.getElementById("enterTitle")
let create = document.getElementById("create")
let deleteAll = document.getElementById("deleteAll")

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

// SHOW DATA
function showData() {
    let table = ""
    for (let i = 0; i < data.length; i++) {
        table += `
            <tr class="bg-blue-900 text-white border-2">
                <td>${i + 1}</td>

                <td>
                    <img class="p-1 w-16 h-16 rounded-full m-auto"src="${data[i].img}"alt="${data[i].enterTitle}">
                </td>

                <td>${data[i].enterTitle}</td>

                <td>
                    <i onclick="toggleFavorite(${i})"
                        class="fa-solid fa-heart cursor-pointer ${data[i].favorite ? 'text-red-500' : 'text-gray-400'}">
                    </i>
                </td>


                <td>
                    <button
                        onclick="editItem(${i})"
                        class="bg-blue-600 text-white m-1 p-1 rounded-xl">
                        update
                    </button>

                    <button
                        onclick="deleteItems(${i})"
                        class="bg-red-600 text-white m-1 p-1 rounded-xl">
                        delete
                    </button>
                </td>
            </tr>
        `
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