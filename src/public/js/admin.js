'strict mode';

let cancelBtn = document.querySelector('.cancel-btn');
cancelBtn.addEventListener('click', (event) => {
  event.target.closest('.msg').style.display = 'none';
});
