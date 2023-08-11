const firebaseConfig = {
    apiKey: "AIzaSyAkr8WxRaZpbXMCCNx9PcNOrCxhI3l2Dy0",
    authDomain: "habitatmodule-23fff.firebaseapp.com",
    projectId: "habitatmodule-23fff",
    storageBucket: "habitatmodule-23fff.appspot.com",
    messagingSenderId: "1018682199626",
    appId: "1:1018682199626:web:14546286b0f4dd96f360b3",
    measurementId: "G-MXDQL7NSCQ"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

let duration = 1500; // 25 minutes in seconds
let elapsed = 1500;
let interval;
let score = 0;
let potentialScore = 0;
let currentUser = null;

const playBtn = document.querySelector('.play-btn');
const resetBtn = document.querySelector('.reset-btn');
const timeEl = document.querySelector('.time');
const progressValue = document.querySelector('.progress-ring__value');
const scoreEl = document.querySelector('.score-value');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        fetchScoreFromDatabase();
    } else {
        currentUser = null;
    }
});

function fetchScoreFromDatabase() {
    if (currentUser) {
        let db = firebase.firestore();
        let userRef = db.collection('users').doc(currentUser.uid);
        userRef.get().then((doc) => {
            if (doc.exists) {
                score = doc.data().score;
                scoreEl.innerText = score + " PTS";
            }
        }).catch((error) => {
            console.error("Error fetching score: ", error);
        });
    }
}

function setProgress(value) {
    const circumference = 2 * Math.PI * 98;
    const offset = circumference - (value / 100 * circumference);
    progressValue.style.strokeDasharray = `${circumference} ${circumference}`;
    progressValue.style.strokeDashoffset = offset;
}

function updateTimerAndScore() {
    elapsed--;
    potentialScore += 5;
    scoreEl.innerText = Math.floor(score + potentialScore / 5) + " PTS";

    let min = Math.floor(elapsed / 60);
    let sec = elapsed % 60;
    timeEl.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;

    let progressPercentage = (elapsed / duration) * 100;
    setProgress(progressPercentage);

    if (elapsed <= 0) {
        clearInterval(interval);
        score += potentialScore;
        potentialScore = 0;
        elapsed = 1500;
        saveScoreToDatabase();
        timeEl.innerText = "25:00";
        setProgress(100);
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    }
}

playBtn.addEventListener('click', function() {
    if (playBtn.classList.contains("fa-play")) {
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
        interval = setInterval(updateTimerAndScore, 200);
    } else {
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
        clearInterval(interval);
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    elapsed = 1500;
    timeEl.innerText = "25:00";
    setProgress(100);
    potentialScore = 0;
    scoreEl.innerText = score + " PTS";
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
});

document.querySelector('.reset-score-btn').addEventListener('click', function() {
    score = 0;
    scoreEl.innerText = score + " PTS";
    saveScoreToDatabase();
});

document.querySelector('.add-score-btn').addEventListener('click', function() {
    console.log("Add Score button clicked");
    score += 500;
    console.log("New score:", score);
    scoreEl.innerText = score + " PTS";
    saveScoreToDatabase();
});



function saveScoreToDatabase() {
    if (currentUser) {
        let db = firebase.firestore();
        db.collection('users').doc(currentUser.uid).set({
            score: score
        });
    }
}

function registerUser() {
    let email = registerEmail.value;
    let password = registerPassword.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        currentUser = userCredential.user;
        saveScoreToDatabase();
    })
    .catch((error) => {
        console.error("Error during registration: ", error);
    });
}

function loginUser() {
    let email = loginEmail.value;
    let password = loginPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        currentUser = userCredential.user;
        fetchScoreFromDatabase();
    })
    .catch((error) => {
        console.error("Error during login: ", error);
    });
}
