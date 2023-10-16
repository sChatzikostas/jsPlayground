document.addEventListener('DOMContentLoaded', function() {
  var solveButtons = document.getElementsByClassName('solveButton');
  var checkButton = document.getElementById('checkButton');
  var verbInputs = document.querySelectorAll('input[data-correct-answer]');
  var solveAllButton = document.getElementById('solveAllButton');

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
        clearFeedback('result' + questionNumber);
      }

      checkButton.disabled = !areAllInputsFilled();
    });
  }

  for (var i = 0; i < verbInputs.length; i++) {
    verbInputs[i].addEventListener('input', function() {
      var questionNumber = this.getAttribute('id').replace('verb', '');

      if (this.value === '') {
        clearFeedback('result' + questionNumber);
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
        clearFeedback('result' + (i + 1));
      }
      solveAllButton.textContent = 'Clear All';
      checkButton.disabled = true;
    } else {
      for (var i = 0; i < verbInputs.length; i++) {
        var verbInput = verbInputs[i];
        verbInput.value = '';
        clearFeedback('result' + (i + 1));
      }
      solveAllButton.textContent = 'Solve All';
      checkButton.disabled = !areAllInputsFilled();
    }
  });

  checkButton.addEventListener('click', function() {
    checkAnswers();
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
    var resultElements = document.querySelectorAll('[id^="result"]');

    for (var i = 0; i < verbInputs.length; i++) {
      var verbInput = verbInputs[i];
      var result = resultElements[i];
      var answer = verbInput.value.toLowerCase().trim();
      var correctAnswer = verbInput.getAttribute('data-correct-answer');

      if (answer === correctAnswer) {
        result.innerHTML = 'Correct!';
        result.style.color = 'green';
      } else {
        result.innerHTML = 'Incorrect. Try again.';
        result.style.color = 'red';
      }
    }
  }

  function clearFeedback(resultId) {
    var result = document.getElementById(resultId);
    result.innerHTML = '';
  }
});