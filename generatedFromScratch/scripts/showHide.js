document.addEventListener('DOMContentLoaded', function() {
    // Get all the solution buttons
    const solutionButtons = document.querySelectorAll('.solutionButton');

    // Get all the solution elements
    const solutions = document.querySelectorAll('.solution');

    // Set the initial state of solutions to display: none
    solutions.forEach(solution => {
        solution.style.display = 'none';
    });

    // Add click event listeners to each solution button
    solutionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const solution = button.nextElementSibling;
            solution.style.display = solution.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Get the toggle all button
    const toggleAllButton = document.getElementById('toggleAllButton');

    // Add click event listener to toggle all button
    toggleAllButton.addEventListener('click', () => {
        const allHidden = Array.from(solutions).every(solution => solution.style.display === 'none');

        solutions.forEach(solution => {
            solution.style.display = allHidden ? 'block' : 'none';
        });

        toggleAllButton.textContent = allHidden ? 'Hide All Solutions' : 'Show All Solutions';
    });
});