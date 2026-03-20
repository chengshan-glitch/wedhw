let timeLeft = 10; // 倒數 10 秒
const progressBar = document.getElementById('progressBar');
const timerText = document.getElementById('timerText');

function updateTimer() {
    if (timeLeft > 0) {
        // 更新進度條寬度
        let progressPercent = ((10 - timeLeft) / 10) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        timerText.innerText = `預計 ${Math.ceil(timeLeft)} 秒後重新偵測...`;
        timeLeft -= 0.1; // 每次跑 0.1 秒讓動畫更平滑
    } else {
        // 模擬重新偵測
        progressBar.style.width = `100%`;
        timerText.innerText = "正在重新連線...";
        
        // 模擬偵測完畢後重置（實際開發會跳轉頁面）
        setTimeout(() => {
            timeLeft = 10;
        }, 1000);
    }
}

// 每 100 毫秒執行一次
setInterval(updateTimer, 100);