
document.addEventListener('DOMContentLoaded', function () {
  const senhaInput = document.getElementById('senha');
  const toggleBtn = document.getElementById('togglePassword');

  toggleBtn.addEventListener('click', function () {
    if (senhaInput.type === 'password') {
      senhaInput.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      senhaInput.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  });
});
