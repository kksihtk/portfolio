  const roles = ['Backend-dev', 'Photographer', 'Musician'];
  const textElement = document.getElementById('animated-text');
  const scrollBtn = document.getElementById("scrollToTopBtn");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const card = document.getElementById('cardTilt');
  const imagePool = [
    "./images/photos/photo1.webp", "./images/photos/photo2.webp", "./images/photos/photo3.webp",
    "./images/photos/photo4.webp", "./images/photos/photo5.webp", "./images/photos/photo6.webp",
    "./images/photos/photo7.webp", "./images/photos/photo8.webp", "./images/photos/photo9.webp",
    "./images/photos/photo10.webp", "./images/photos/photo11.webp"
  ];
  const age = calculateAge('2006-09-12');
  const carouselImages = document.querySelectorAll('.carousel img');
  const header = document.querySelector('.glass-header');
  let isHeaderForcedVisible = false;
  let lastScrollTop = 0;

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

let carouselTimer = null;

function carouselChangeImage() {
  // Очищаем предыдущий таймер
  if (carouselTimer) clearTimeout(carouselTimer);
  
  // Выбираем случайное изображение из карусели
  const randomImg = carouselImages[Math.floor(Math.random() * carouselImages.length)];
  
  // Если изображение видно в viewport
  if (randomImg.getBoundingClientRect().top < window.innerHeight) {
    const newSrc = imagePool[Math.floor(Math.random() * imagePool.length)];
    
    randomImg.classList.add('fade-out');
    
    setTimeout(() => {
      randomImg.src = newSrc;
      randomImg.classList.replace('fade-out', 'fade-in');
      
      setTimeout(() => randomImg.classList.remove('fade-in'), 600);
    }, 600);
  }
  
  // Устанавливаем следующий вызов через 3-5 секунд
  carouselTimer = setTimeout(carouselChangeImage, 3000 + Math.random() * 2000);
}

//   function carouselChangeImage() {
//   carouselImages.forEach(img => {
//     setInterval(() => {
//       const newSrc = imagePool[Math.floor(Math.random() * imagePool.length)];

//       img.classList.add('fade-out');

//       setTimeout(() => {
//         img.src = newSrc;

//         img.classList.remove('fade-out');
//         img.classList.add('fade-in');

//         setTimeout(() => {
//           img.classList.remove('fade-in');
//         }, 600);
//       }, 600);
//     }, 5000 + Math.random() * 5000);
//   });
// }

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    // Если день рождения в этом году ещё не наступил, уменьшаем возраст
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

function toggleHeaderVisibility() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Прокрутка вниз — скрыть
      header.classList.add('hidden');
    } else {
      // Прокрутка вверх — показать
      header.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

window.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    carouselChangeImage();
    document.getElementById('CurrentAge').textContent = age;
    loadMonacoEditor();
});
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const halfPage = (documentHeight - windowHeight) / 2;

    let offset1, offset2, offset3;

    if (scrollY <= halfPage) {
        offset1 = scrollY * 0.4;
        offset2 = scrollY * 0.6;
        offset3 = scrollY * 0.8;
    } else {
        const delta = scrollY - halfPage;
        offset1 = (halfPage - delta) * 0.9;
        offset2 = (halfPage - delta) * 0.5;
        offset3 = (halfPage - delta) * 0.1;
    }

    document.querySelector(".blob-wrapper-1").style.transform = `translateY(${offset1}px)`;
    document.querySelector(".blob-wrapper-2").style.transform = `translateY(${offset2}px)`;
    document.querySelector(".blob-wrapper-3").style.transform = `translateY(${offset3}px) translateX(-50%)`;
    if (window.scrollY > 300) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
  toggleHeaderVisibility();
});

window.addEventListener('mousemove', (e) => {
    let nearTop = e.clientY <= 100;

    if (nearTop && !isHeaderForcedVisible) {
        header.classList.remove('hidden');
        isHeaderForcedVisible = true;
    } else if (!nearTop && isHeaderForcedVisible) {
        header.classList.add('hidden');
        isHeaderForcedVisible = false;
    }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x внутри элемента
      const y = e.clientY - rect.top;  // y внутри элемента

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 30; // угол поворота по X
      const rotateY = ((x - centerX) / centerX) * 30; // угол поворота по Y

      const shadowX = ((x - centerX) / centerX) * -20; // -20px ... +20px
      const shadowY = ((y - centerY) / centerY) * -20;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(+20px, +20px)`;
      card.style.boxShadow = `${shadowX*-1}px ${shadowY*-1}px 40px #FFB8F6`;
});

card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg) translate(20px, 20px)`;
});

