  const roles = ['Backend-dev', 'Photographer', 'Musician'];
  const textElement = document.getElementById('animated-text');
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (deleting) {
      if (charIndex > 0) {
        charIndex--;
        textElement.textContent = currentRole.slice(0, charIndex);
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    } else {
      if (charIndex < currentRole.length) {
        charIndex++;
        textElement.textContent = currentRole.slice(0, charIndex);
      } else {
        deleting = true;
        setTimeout(typeEffect, 1500); // Пауза перед удалением
        return;
      }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
  }

  document.addEventListener('DOMContentLoaded', typeEffect);