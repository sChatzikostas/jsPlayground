function initialize() {
    // Get all the necessary elements
    var dotButtons = document.querySelectorAll('.btn');
    var infoButtons = document.querySelectorAll('.info');
    var solutionButtons = document.querySelectorAll('.solution');
    var infoBoxes = document.querySelectorAll('.infobox');
    var solveAllButton = document.querySelector('.solveAll_btn');
    var resetButton = document.querySelector('.Reset_mc');

    var solNum = dotButtons.length;
    var solved = 0;

    // Add event listeners to buttons
    dotButtons.forEach(function(button) {
        button.pressed = false;
        button.addEventListener('click', onButtonClick);
    });

    infoButtons.forEach(function(button) {
        button.pressed = false;
        button.style.display = 'none';
        button.addEventListener('click', onInfoClick);
    });

    solutionButtons.forEach(function(button) {
        button.style.display = 'none';
    });

    infoBoxes.forEach(function(box) {
        box.style.display = 'none';
    });

    // Add event listener to solveAllButton
    solveAllButton.addEventListener('click', onSolveAllClick);

    // Add event listener to resetButton
    resetButton.addEventListener('click', initialize);

    function onButtonClick() {
        if (!this.pressed) {
            solutionButtons[this.id].style.display = 'block';
            infoButtons[this.id].style.display = 'block';
            infoButtons[this.id].pressed = false;
            this.classList.add('pressed');
            this.pressed = true;
            solved++;
        } else {
            solutionButtons[this.id].style.display = 'none';
            infoButtons[this.id].style.display = 'none';
            infoBoxes[this.id].style.display = 'none';
            this.classList.remove('pressed');
            this.pressed = false;
            solved--;
        }

        if (solved === solNum) {
            solveAllButton.pressed = true;
            solveAllButton.classList.add('pressed');
        } else {
            solveAllButton.pressed = false;
            solveAllButton.classList.remove('pressed');
        }
    }

    function onInfoClick() {
        if (!this.pressed) {
            infoBoxes.forEach(function(box) {
                box.style.display = 'none';
            });

            infoButtons.forEach(function(button) {
                button.classList.remove('pressed');
                button.pressed = false;
            });

            solutionButtons[this.id].style.display = 'block';
            infoBoxes[this.id].style.display = 'block';
            dotButtons[this.id].classList.add('pressed');
            dotButtons[this.id].pressed = true;
            this.classList.add('pressed');
            this.pressed = true;
        } else {
            infoBoxes[this.id].style.display = 'none';
            this.pressed = false;
            this.classList.remove('pressed');
        }
    }

    function onSolveAllClick() {
        if (!this.pressed) {
            solved = solNum;

            infoBoxes.forEach(function(box, index) {
                box.style.display = 'none';
                solutionButtons[index].style.display = 'block';
                infoButtons[index].style.display = 'block';
                infoButtons[index].pressed = false;
                dotButtons[index].classList.add('pressed');
                dotButtons[index].pressed = true;
            });

            this.classList.add('pressed');
            this.pressed = true;
        } else {
            solved = 0;

            infoBoxes.forEach(function(box) {
                box.style.display = 'none';
            });

            solutionButtons.forEach(function(button) {
                button.style.display = 'none';
            });

            infoButtons.forEach(function(button) {
                button.style.display = 'none';
                button.pressed = false;
            });

            dotButtons.forEach(function(button) {
                button.classList.remove('pressed');
                button.pressed = false;
            });

            this.classList.remove('pressed');
            this.pressed = false;
        }
    }
}