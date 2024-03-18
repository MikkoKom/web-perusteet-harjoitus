function addHoleInputs(numHoles, parScores, playerScores) {
    let holeInputs = document.getElementById("holeInputs")
    holeInputs.innerHTML = ""

    for (let i = 0; i < numHoles; i++) {
        let holeDiv = document.createElement("div")
        let labelPar = document.createElement("label")
        labelPar.textContent = `Par väylä ${i + 1}: `
        let inputPar = document.createElement("input")
        inputPar.type = "number"
        inputPar.className = "holeParInput"
        inputPar.min = "1";
        inputPar.value = parScores[i] || "3" // Default par or saved value
        let labelScore = document.createElement("label")
        labelScore.textContent = ` Tuloksesi: `
        let inputScore = document.createElement("input")
        inputScore.type = "number"
        inputScore.className = "playerScoreInput"
        inputScore.min = "0"
        inputScore.value = playerScores[i] || "0" // Default score or saved value
        holeDiv.appendChild(labelPar)
        holeDiv.appendChild(inputPar)
        holeDiv.appendChild(labelScore)
        holeDiv.appendChild(inputScore)
        holeInputs.appendChild(holeDiv)
        holeInputs.appendChild(document.createElement("br"))
    }
    saveDataToLocalStorage(numHoles, parScores, playerScores) // Save data whenever inputs are updated
}

function saveDataToLocalStorage(numHoles, parScores, playerScores) {
    let data = {
        numHoles: numHoles,
        parScores: parScores,
        playerScores: playerScores
    };

    // Save data to local storage
    localStorage.setItem("golfData", JSON.stringify(data))
}

function loadDataFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem("golfData"))
    if (data) {
        document.getElementById("numHoles").value = data.numHoles
        addHoleInputs(data.numHoles, data.parScores, data.playerScores)
    }
}

function calculateGolfScore() {
    let numHoles = parseInt(document.getElementById("numHoles").value)
    let parInputs = document.querySelectorAll(".holeParInput")
    let playerScoreInputs = document.querySelectorAll(".playerScoreInput")
    let parScores = []
    let playerScores = []

    parInputs.forEach(input => {
        parScores.push(input.value)
    });
    playerScoreInputs.forEach(input => {
        playerScores.push(input.value)
    });

    let totalPar = 0
    let totalScore = 0

    parScores.forEach(score => {
        totalPar += parseInt(score)
    });

    playerScores.forEach(score => {
        totalScore += parseInt(score)
    });

    let scoreDifference = totalScore - totalPar

    let result = document.getElementById("result")
    result.innerHTML = `Par tulos: ${totalPar} <br>`
    result.innerHTML += `Sinun tuloksesi: ${totalScore} <br>`
    if (scoreDifference === 0) {
        result.innerHTML += "Heiti parin!"
    } else if (scoreDifference < 0) {
        result.innerHTML += `Heitit ${-scoreDifference} alle parin! Hienoa!`
    } else {
        result.innerHTML += `Heitit ${scoreDifference} yli parin.`
    }

    saveDataToLocalStorage(numHoles, parScores, playerScores) // Save data whenever scores are calculated
}

function resetInputs() {
    localStorage.removeItem("golfData") // Clear saved data from local storage
    document.getElementById("numHoles").value = "" // Clear number of holes input
    document.getElementById("holeInputs").innerHTML = "" // Clear hole inputs
}

document.getElementById("addHolesButton").addEventListener("click", function() {
    let numHoles = parseInt(document.getElementById("numHoles").value)
    if (numHoles) {
        addHoleInputs(numHoles, [], []) // Initialize input fields for the selected number of holes
    } else {
        alert("Please enter the number of holes first.")
    }
});
document.getElementById("calculateButton").addEventListener("click", calculateGolfScore)
document.getElementById("resetButton").addEventListener("click", resetInputs)

window.addEventListener("load", loadDataFromLocalStorage)