let timeLeft = 10; // 倒數 10 秒
const totalDuration = 10;
const progressBar = document.getElementById('progressBar');
const timerText = document.getElementById('timerText');
const train = document.getElementById('train');
const track = document.querySelector('.train-track');
let audioPlayed = false;

function playArrivalSound() {
    // 使用 Web Audio API 生成簡單提示音
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
}

function updateTimer() {
    let progressPercent;
    if (timeLeft > 0) {
        progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;
        timerText.innerText = `預計 ${Math.ceil(timeLeft)} 秒後重新偵測...`;
        timeLeft -= 0.1; // 每次跑 0.1 秒讓動畫更平滑
    } else {
        progressPercent = 100;
        timerText.innerText = "正在重新連線...";

        if (!audioPlayed) {
            playArrivalSound();
            audioPlayed = true;
        }

        setTimeout(() => {
            timeLeft = totalDuration;
            audioPlayed = false;
        }, 1000);
    }

    progressBar.style.width = `${progressPercent}%`;

    const trackWidth = track.clientWidth;
    const trainWidth = train.clientWidth;
    const maxLeft = Math.max(trackWidth - trainWidth, 0);
    const currentLeft = (progressPercent / 100) * maxLeft;
    train.style.left = `${currentLeft}px`;
}

// 每 100 毫秒執行一次
setInterval(updateTimer, 100);