
// Khai báo các biến của trò chơi
let score = 0;
let timeLeft = 30;
let timer;
let isPlaying = false;

// Lấy các phần tử HTML
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const target = document.getElementById("target");
const arena = document.getElementById("arena");
const startBtn = document.getElementById("startBtn");
const colorBtn = document.getElementById("colorBtn");
const playerBtn = document.getElementById("playerBtn");
const duration = document.getElementById("duration");
const playerInfo = document.getElementById("playerInfo");
const result = document.getElementById("result");

// Gắn sự kiện cho các nút
startBtn.addEventListener("click", startGame);
colorBtn.addEventListener("click", changeColor);
playerBtn.addEventListener("click", showPlayer);

// Gắn sự kiện click cho mục tiêu
target.addEventListener("click", hitTarget);


// Hàm tạo vị trí ngẫu nhiên cho mục tiêu
function moveTarget() {

    let maxLeft = arena.clientWidth - target.offsetWidth;
    let maxTop = arena.clientHeight - target.offsetHeight;

    let randomLeft = Math.random() * maxLeft;
    let randomTop = Math.random() * maxTop;

    target.style.left = randomLeft + "px";
    target.style.top = randomTop + "px";

    target.style.display = "block";
}


// Hàm bắt đầu trò chơi
function startGame() {

    score = 0;

    // Lấy thời gian người chơi đã chọn
    timeLeft = Number(duration.value);

    isPlaying = true;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    result.textContent = "";

    // Khóa nút bắt đầu khi trò chơi đang chạy
    startBtn.disabled = true;

    // Không cho thay đổi thời gian khi đang chơi
    duration.disabled = true;

    // Hiển thị mục tiêu đầu tiên
    moveTarget();

    // Đếm ngược mỗi giây
    timer = setInterval(function() {

        timeLeft--;

        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }

    }, 1000);
}


// Hàm xử lý khi click trúng mục tiêu
function hitTarget() {

    if (!isPlaying) {
        return;
    }

    score++;

    scoreDisplay.textContent = score;

    // Đổi vị trí mục tiêu ngay sau khi click
    moveTarget();
}


// Hàm đổi màu nền ngẫu nhiên
function changeColor() {

    let colors = [
        "#d6eaf8",
        "#fadbd8",
        "#d5f5e3",
        "#fcf3cf",
        "#e8daef",
        "#d6dbdf"
    ];

    let randomIndex = Math.floor(Math.random() * colors.length);

    arena.style.backgroundColor = colors[randomIndex];
}


// Hàm hiển thị mã số sinh viên
function showPlayer() {

    playerInfo.textContent = "Mã số sinh viên: MSSV_CUA_BAN";
}


// Hàm kết thúc trò chơi
function endGame() {

    clearInterval(timer);

    isPlaying = false;

    // Ẩn mục tiêu
    target.style.display = "none";

    // Mở lại nút bắt đầu
    startBtn.disabled = false;

    // Cho phép chọn thời gian mới
    duration.disabled = false;

    // Hiển thị tổng điểm
    result.textContent =
        "Trò chơi kết thúc! Tổng điểm của bạn: " + score;
}
