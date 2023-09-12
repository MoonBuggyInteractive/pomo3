import { missions } from './missions.js';

const TOTAL_TIME = 1500; 

let duration = TOTAL_TIME;
let elapsed = TOTAL_TIME;
let interval;
let score = 0;
let potentialScore = 0;
let potentialScoreIncrement = 1; // Default value
let distanceTravelled = 0;
let regolithMined = 0;
let constructionProgress = 0;
let potentialDistance = 0;
let potentialRegolith = 0;
let potentialConstruction = 0;
let msElapsed = 0;


let totalDistanceTravelled = 0;
let totalRegolithMined = 0;
let totalConstructionProgress = 0;
let tasksCompleted = 0;
let missionsCompleted = 0;
let currentDialogueIndex = 0;


const tasksCompletedEl = document.querySelector('.tasks-completed');
const missionsCompletedEl = document.querySelector('.missions-completed');
const missionNameEl = document.querySelector('.mission-name');
const missionTypeEl = document.querySelector('.score-type');
const missionDialogueEl = document.querySelector('.mission-dialogue');
const playBtn = document.querySelector('.play-btn');
const resetBtn = document.querySelector('.reset-btn');
const timeEl = document.querySelector('.time');
const progressValue = document.querySelector('.progress-ring__value');
const scoreEl = document.querySelector('.score-value');
const missionProgressBar = document.querySelector('.mission-progress-bar');
const missionProgressFilled = document.querySelector('.mission-progress-filled');
const missionIconLeftEl = document.querySelector('.mission-icon-left');
const missionIconRightEl = document.querySelector('.mission-icon-right');

let currentMissionIndex = 0;

function setMissionMoveIcon() {
    const iconEl = document.getElementById('dynamic-icon');
    switch (missions[currentMissionIndex].type) {
        case "Distance":
            iconEl.src = "icons/ico_rocket_1.svg";
            console.log("Icon SRC:", iconEl.src);

            break;
        case "Mining":
            iconEl.src = "icons/ico_rocket_1.svg";  // Example path, replace with actual path
            break;
        case "Construction":
            iconEl.src = "icons/ico_rocket_1.svg";  // Example path, replace with actual path
            break;
        default:
            iconEl.src = "icons/ico_rocket_1.svg"; // Default or empty image
            break;
    }
}

window.onload = function() {
    let savedScore = localStorage.getItem('score');
    if (savedScore) {
        score = parseInt(savedScore);
        scoreEl.innerText = score;
    }
    missionNameEl.innerText = missions[currentMissionIndex].name;
    missionDialogueEl.innerText = missions[currentMissionIndex].dialogue;
    missionIconLeftEl.innerHTML = `<img src="${missions[currentMissionIndex].leftIcon}" alt="Left Icon">`;
    missionIconRightEl.innerHTML = `<img src="${missions[currentMissionIndex].rightIcon}" alt="Right Icon">`;
    updateMissionTypeDisplay();
    setMissionMoveIcon();
    console.log('Setting icons:', missions[currentMissionIndex].leftIcon, missions[currentMissionIndex].rightIcon);
};

function updateMissionTypeDisplay() {
    if (currentMissionIndex >= missions.length) return;

    switch (missions[currentMissionIndex].type) {
        case "Distance":
            potentialScoreIncrement = 10;
            missionTypeEl.textContent = "Kilometers Travelled";
            break;
        case "Mining":
            potentialScoreIncrement = 1;
            missionTypeEl.textContent = "Regolith Collected";
            break;
        case "Construction":
            potentialScoreIncrement = 0.5;
            missionTypeEl.textContent = "Build Progress";
            break;
        default:
            missionTypeEl.textContent = "";
            break;
    }
}

function updateDialogue() {
    // If there's no more dialogue to show, exit early
    if (currentDialogueIndex >= missions[currentMissionIndex].dialogues.length) return;

    // Get the current dialogue message based on the currentDialogueIndex
    const dialogueMessage = missions[currentMissionIndex].dialogues[currentDialogueIndex].message;
    
    // Update the mission dialogue on the page
    missionDialogueEl.innerText = dialogueMessage;
}

playBtn.addEventListener('click', function() {
    
    if (playBtn.classList.contains("fa-play")) {
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");

        
        interval = setInterval(function() {
            msElapsed += 200;

            if (missions[currentMissionIndex].type === "Distance") {
                potentialDistance += potentialScoreIncrement;
            } else if (missions[currentMissionIndex].type === "Mining") {
                potentialRegolith += potentialScoreIncrement;
            } else if (missions[currentMissionIndex].type === "Construction") {
                potentialConstruction += potentialScoreIncrement;
            }

            scoreEl.innerText = Math.floor(score + potentialDistance + potentialRegolith + potentialConstruction);

            if (msElapsed % 1000 === 0) {
                elapsed--;
                let min = Math.floor(elapsed / 60);
                let sec = elapsed % 60;
                timeEl.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
            }

            let radialProgressPercentage = (1 - (msElapsed / (duration * 1000))) * 100;
            setProgress(radialProgressPercentage);

            let missionStartScore = currentMissionIndex > 0 ? missions[currentMissionIndex - 1].pointsRequired : 0;
            let currentMissionScore = score + potentialDistance + potentialRegolith + potentialConstruction - missionStartScore;
            let missionRequiredScore = missions[currentMissionIndex].pointsRequired - missionStartScore;

            let missionProgressPercentage = (currentMissionScore / missionRequiredScore) * 100;
            missionProgressPercentage = Math.min(missionProgressPercentage, 100);
            missionProgressFilled.style.width = `${missionProgressPercentage}%`;
           
            // Move the icon
            document.querySelector('.mission-icon-move').style.left = `${missionProgressPercentage}%`;

            // Check for dialogue updates based on current score
            let currentMissionDialogue = missions[currentMissionIndex].dialogues[currentDialogueIndex];
            if (currentMissionScore >= currentMissionDialogue.pointsThreshold) {
                updateDialogue();
                currentDialogueIndex++;
                if (currentDialogueIndex >= missions[currentMissionIndex].dialogues.length) {
                    currentDialogueIndex = 0;  // Reset index if we've shown all dialogues
                }
            }

            if (elapsed <= 0) {
                clearInterval(interval);
                score += potentialDistance + potentialRegolith + potentialConstruction;
                distanceTravelled += potentialDistance;
                regolithMined += potentialRegolith;
                constructionProgress += potentialConstruction;

                potentialDistance = 0;
                potentialRegolith = 0;
                potentialConstruction = 0;

                localStorage.setItem('score', score);
                elapsed = TOTAL_TIME;
                timeEl.innerText = `${Math.floor(TOTAL_TIME / 60)}:${TOTAL_TIME % 60 < 10 ? '0' : ''}${TOTAL_TIME % 60}`;
                setProgress(100);
                playBtn.classList.remove("fa-pause");
                playBtn.classList.add("fa-play");
                tasksCompleted++;
                tasksCompletedEl.innerText = tasksCompleted;
            }

            if (score >= missions[currentMissionIndex].pointsRequired && missionsCompleted == currentMissionIndex) {
                missions[currentMissionIndex].completed = true;
                missionsCompleted++;
                missionsCompletedEl.innerText = missionsCompleted;

                distanceTravelled = 0;
                regolithMined = 0;
                constructionProgress = 0;

                currentMissionIndex++;
                while (currentMissionIndex < missions.length && missions[currentMissionIndex].completed) {
                    currentMissionIndex++;
                }

                if (currentMissionIndex < missions.length) {
                    missionNameEl.innerText = missions[currentMissionIndex].name;
                    missionDialogueEl.innerText = missions[currentMissionIndex].dialogue;
                    updateMissionTypeDisplay();
                } else {
                    missionNameEl.innerText = "All missions completed!";
                    missionDialogueEl.innerText = "";
                }
            }

        }, 200);
    } else {
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
        clearInterval(interval);
    }
});





resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    elapsed = TOTAL_TIME;
    msElapsed = 0;
    timeEl.innerText = `${Math.floor(TOTAL_TIME / 60)}:${TOTAL_TIME % 60 < 10 ? '0' : ''}${TOTAL_TIME % 60}`;
    setProgress(100);
    
    potentialDistance = 0;
    potentialRegolith = 0;
    potentialConstruction = 0;
    scoreEl.innerText = score + potentialDistance + potentialRegolith + potentialConstruction;
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
});



document.querySelector('.reset-score-text').addEventListener('click', function() {
    score = 0;
    scoreEl.innerText = score;
    localStorage.setItem('score', score);

    missionsCompleted = 0;
    missionsCompletedEl.innerText = missionsCompleted;
    tasksCompleted = 0;
    tasksCompletedEl.innerText = tasksCompleted;

    currentMissionIndex = 0;
    missionNameEl.innerText = missions[currentMissionIndex].name;
    missionDialogueEl.innerText = missions[currentMissionIndex].dialogue;

    updateMissionTypeDisplay();
});

function setProgress(value) {
    const circumference = 2 * Math.PI * 98;
    const offset = circumference - (value / 100 * circumference);
    progressValue.style.strokeDasharray = `${circumference} ${circumference}`;
    progressValue.style.strokeDashoffset = offset;
}
