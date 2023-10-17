document.addEventListener('DOMContentLoaded', function() {
  var solveButtons = document.getElementsByClassName('solveButton');
  var checkButton = document.getElementById('checkButton');
  var verbInputs = document.querySelectorAll('input[data-correct-answer]');
  var solveAllButton = document.getElementById('solveAllButton');
  var modeToggle = document.getElementById('modeToggle');
  var resultContainer = document.getElementById('resultContainer');
  var scoreDisplay = document.getElementById('scoreDisplay');

  modeToggle.addEventListener('change', function() {
    resetExercise();
  });

  for (var i = 0; i < solveButtons.length; i++) {
    solveButtons[i].addEventListener('click', function() {
      var questionNumber = this.getAttribute('data-question');
      var verbInput = document.getElementById('verb' + questionNumber);
      var correctAnswer = verbInput.getAttribute('data-correct-answer');

      if (verbInput.value === '') {
        verbInput.value = correctAnswer;
        this.innerHTML = '(...)';
      } else {
        verbInput.value = '';
        this.innerHTML = '(...)';
      }

      checkButton.disabled = !areAllInputsFilled();
    });
  }

  for (var i = 0; i < verbInputs.length; i++) {
    verbInputs[i].addEventListener('input', function() {
      var questionNumber = this.getAttribute('id').replace('verb', '');

      if (this.value === '') {
        clearFeedback(questionNumber);
      }

      checkButton.disabled = !areAllInputsFilled();
    });
  }

  solveAllButton.addEventListener('click', function() {
    if (solveAllButton.textContent === 'Solve All') {
      for (var i = 0; i < verbInputs.length; i++) {
        var verbInput = verbInputs[i];
        var correctAnswer = verbInput.getAttribute('data-correct-answer');
        verbInput.value = correctAnswer;
        clearFeedback(i + 1);
      }
      solveAllButton.textContent = 'Clear All';
      checkButton.disabled = true;
    } else {
      for (var i = 0; i < verbInputs.length; i++) {
        var verbInput = verbInputs[i];
        verbInput.value = '';
        clearFeedback(i + 1);
      }
      solveAllButton.textContent = 'Solve All';
      checkButton.disabled = !areAllInputsFilled();
    }
  });

  checkButton.addEventListener('click', function() {
    checkAnswers();
    showScore();
  });

  function areAllInputsFilled() {
    for (var i = 0; i < verbInputs.length; i++) {
      if (verbInputs[i].value === '') {
        return false;
      }
    }
    return true;
  }

  function checkAnswers() {
    var correctCount = 0;

    for (var i = 0; i < verbInputs.length; i++) {
      var verbInput = verbInputs[i];
      var answer = verbInput.value.toLowerCase().trim();
      var correctAnswer = verbInput.getAttribute('data-correct-answer');

      if (answer === correctAnswer) {
        correctCount++;
      }
    }

    return correctCount;
  }

  function showScore() {
    var totalQuestions = verbInputs.length;
    var correctCount = checkAnswers();
    var score = (correctCount / totalQuestions) * 100;

    resultContainer.style.display = 'block';
    scoreDisplay.textContent = 'Your score: ' + score.toFixed(2) + '%';
  }

  function clearFeedback(questionNumber) {
    var result = document.getElementById('result' + questionNumber);
    result.innerHTML = '';
  }

  function resetExercise() {
    modeToggle.disabled = true;
    checkButton.disabled = true;
    solveAllButton.disabled = true;

    for (var i = 0; i < solveButtons.length; i++) {
      solveButtons[i].disabled = true;
    }

    for (var i = 0; i < verbInputs.length; i++) {
      verbInputs[i].disabled = true;
      verbInputs[i].value = '';
      clearFeedback(i + 1);
    }

    resultContainer.style.display = 'none';
    scoreDisplay.textContent = '';

    modeToggle.disabled = false;
    checkButton.disabled = false;
    solveAllButton.disabled = false;

    for (var i = 0; i < solveButtons.length; i++) {
      solveButtons[i].disabled = false;
    }

    for (var i = 0; i < verbInputs.length; i++) {
      verbInputs[i].disabled = false;
    }

    if (modeToggle.value === 'exam') {
      solveAllButton.style.display = 'none';

      for (var i = 0; i < solveButtons.length; i++) {
        solveButtons[i].style.display = 'none';
      }

      clearFeedback();
    } else {
      solveAllButton.style.display = 'inline-block';

      for (var i = 0; i < solveButtons.length; i++) {
        solveButtons[i].style.display = 'inline-block';
      }
    }
  }
});