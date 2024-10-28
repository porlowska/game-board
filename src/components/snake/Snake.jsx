export const Snake = () => {
  return (
    <>
      <main>
        <div class="container">
          <div id="overlay">
            Your final score is: <span id="finalScore"></span>
            <br></br>
            <a onclick="window.location.reload()" href="#">
              Play Again
            </a>
          </div>
          <canvas id="canvas" width="300" height="300"></canvas>
          <div id="stats">
            <div id="current" class="score"></div>
            <div id="high" class="score"></div>
            <button id="clear" onclick="claerScore()">
              Reset Highscore
            </button>
          </div>
        </div>
        <script
          src="https://code.jquery.com/jquery-3.7.1.min.js"
          integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
          crossorigin="anonymous"
        ></script>
        <script src="assets/script.js"></script>
      </main>
    </>
  );
};
