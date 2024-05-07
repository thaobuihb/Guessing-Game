//        Khai báo biến
let secretNumber;
let lastGuess;
let guessesRemaining = 10;
let incorrectGuessCount = 0;
let previousGuesses = [];
let gameRunning = true; // Biến flag để kiểm tra trò chơi có đang chạy hay không

const CORRECT_MESSAGE = "Correct! You must be a powerful psychic.";
const INCORRECT_MESSAGE = "Incorrect. You are merely a normal human.";
const OUT_OF_RANGE_MESSAGE = "Please enter a number between 1 and 10.";
// Hàm tạo số bí ânr ngẫu nhiên
function generateNumber() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
}
// Hàm check số bí ẩn và số của người chơi bằng phép so sánh
function checkIsCorrect(guess) {
  return parseInt(guess) === secretNumber;
}
// xử lý quá trình người chơi đoán số
function makeGuess() {
  if (!gameRunning) return; // Nếu trò chơi đã dừng, không làm gì cả
  if (!secretNumber) {
    generateNumber();
  }
  lastGuess = document.getElementById("user-guess").value;
  //     Kiểm tra xem giá trị người chơi nhập hợp lệ không
  if (isNaN(lastGuess) || lastGuess < 1 || lastGuess > 100) {
    alert(OUT_OF_RANGE_MESSAGE);
    return;
  }

  document.getElementById("user-guess").value = ""; // Xóa nội dung ô đoán
  previousGuesses.push(lastGuess); //Đẩy giá trị người chơi đoán vào phần đã dự đoán
  if (checkIsCorrect(lastGuess)) {
    document.getElementById("guess-result").innerText = CORRECT_MESSAGE;
    document.getElementById("guess-result").className = "correct"; // Thêm lớp 'correct' cho phần tử để có thể chỉnh màu trong CSS
    document.getElementById("guess-hint").innerText = ""; // Ẩn thông báo về số bí ẩn

    // Reset số lần đoán sai liên tiếp về 0 khi người chơi đoán đúng (tuy nhiên chưa được)
    // incorrectGuessCount = 0;

    // Tạo số bí ẩn mới để tiếp tục trò chơi
    // generateNumber();
    endGame();
    // alert(guessesRemaining);
    return;
    // restartGame();
  } else {
    let hint = "The secret number is "; //gợi ý số bí ẩn cao/thấp hơn dự đoán
    if (parseInt(lastGuess) < secretNumber) {
      hint += "higher.";
    } else {
      hint += "lower.";
    }
    document.getElementById("guess-hint").innerText = hint;
    document.getElementById("guess-result").innerText = INCORRECT_MESSAGE;
    document.getElementById("guess-result").className = "wrong"; // Thêm lớp 'wrong' cho phần tử để chỉnh màu trong CSS

    // Tăng số lần đoán sai liên tiếp
    incorrectGuessCount++;
  }

  guessesRemaining--;
  // alert(guessesRemaining);

  // Kiểm tra nếu người chơi đã đoán đúng hoặc hết lượt đoán, kết thúc trò chơi
  if (checkIsCorrect(lastGuess) || guessesRemaining === 0) {
    endGame();
    return;
  }

  // Kiểm tra nếu người chơi đã đoán sai liên tiếp 10 lần, kết thúc trò chơi
  if (incorrectGuessCount === 10) {
    endGame();
    return;
  }

  updatePage();
}
//    Khi trò chơi kết thúc
function endGame() {
  gameRunning = false; // Dừng trò chơi
  if (guessesRemaining === 0) {
    document.getElementById("user-guess").disabled = true; //ngăn người chơi nhập số
    document.getElementsByTagName("button")[0].disabled = true; //ngăn ấn nút đoán
    document.getElementById("restart-button").style.display = "inline"; //hiển thị nút chơi lại
  }
  guessesRemaining = 10;
  updatePage();
}
// Khi người chơi chơi lại
function restartGame() {
  gameRunning = true; // Khởi động lại trò chơi
  secretNumber = null;
  lastGuess = null;
  guessesRemaining = 10;
  incorrectGuessCount = 0;
  previousGuesses = [];
  document.getElementById("user-guess").disabled = false;
  document.getElementsByTagName("button")[0].disabled = false;
  document.getElementById("restart-button").style.display = "none"; //ẩn nút chơi lại
  document.getElementById("guess-hint").innerText = ""; // Ẩn gợi ý khi bắt đầu lại
  document.getElementById("guess-result").innerText = ""; // Đặt lại kết quả
  updatePage();
}
// Hàm cập nhật hiển thị sau mỗi lượt đoán
function updatePage() {
  document.getElementById("last-guess").innerHTML = lastGuess;
  const remaining = document.getElementById("guesses-remaining");
  remaining.innerHTML = guessesRemaining;

  const previousGuessesElement = document.getElementById("previous-guesses");
  previousGuessesElement.innerHTML = previousGuesses.join(", ");

  if (guessesRemaining === 0 || incorrectGuessCount === 10) {
    endGame();
  } else {
    document.getElementById("restart-button").style.display = "none"; // Ẩn nút "Chơi lại" khi đang chơi
  }
}
