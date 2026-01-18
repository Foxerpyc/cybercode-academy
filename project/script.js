let xp = 0;
let audioUnlocked = false;

/* ---------- Sound Helpers ---------- */
function playSound(id) {
    const sound = document.getElementById(id);
    if (!sound) return;
    sound.currentTime = 0;
    sound.play();
}

/* ---------- Live Preview ---------- */
document.getElementById("htmlInput").addEventListener("input", () => {
    const code = htmlInput.value;
    document.getElementById("display").innerHTML = code;
    showHint();
});

/* ---------- Hint System ---------- */
function showHint() {
    const code = document.getElementById("htmlInput").value;
    const hint = document.getElementById("hint");

    if (code.trim().length === 0) {
        hint.innerText = "Tip: Start by typing some HTML code";
    } else if (!code.includes("<h1")) {
        hint.innerText = "Tip: Try adding a heading using <h1>";
    } else if (!code.includes("<p")) {
        hint.innerText = "Tip: Add a paragraph using <p>";
    } else if (!code.includes("<html")) {
        hint.innerText = "Tip: A complete page usually includes <html>";
    } else {
        hint.innerText = "Tip: Your HTML structure looks good!";
    }
}

/* ---------- TEST Logic ---------- */
function runTest() {
    playSound("click-sound");

    const history = document.getElementById("history");
    const code = document.getElementById("htmlInput").value.trim();

    history.innerHTML += "<br>> Running HTML test...";
    history.scrollTop = history.scrollHeight;

    if (code.length === 0) {
        history.innerHTML += "<br>> ✗ No code detected.";
        playSound("error-sound");
        return;
    }

    let score = 0;

    setTimeout(() => {
        if (code.includes("<h1")) {
            history.innerHTML += "<br>> ✓ Heading (&lt;h1&gt;) detected";
            score++;
        } else {
            history.innerHTML += "<br>> ✗ Missing heading (&lt;h1&gt;)";
        }

        if (code.includes("<p")) {
            history.innerHTML += "<br>> ✓ Paragraph (&lt;p&gt;) detected";
            score++;
        } else {
            history.innerHTML += "<br>> ✗ Missing paragraph (&lt;p&gt;)";
        }

        if (code.includes("<html")) {
            history.innerHTML += "<br>> ✓ HTML structure detected";
            score++;
        } else {
            history.innerHTML += "<br>> ⚠ Missing &lt;html&gt; structure";
        }

        // Final result
        history.innerHTML += `<br>> Test completed. Score: ${score}/3`;

        // Sound + XP feedback
        if (score >= 2) {
            playSound("success-sound");
        } else {
            playSound("error-sound");
        }

        gainXP(score * 15);
        history.scrollTop = history.scrollHeight;

    }, 500); // 小延迟，增加“检测感”
}

/* ---------- XP System ---------- */
function gainXP(amount) {
    xp = Math.min(100, xp + amount);
    document.getElementById("xp-bar").style.width = xp + "%";

    if (xp >= 100) {
        document.getElementById("rank-text").innerText = "LEVEL: ADVANCED";
    }
}
