// Menjalankan kode hanya saat DOM sudah sepenuhnya siap
document.addEventListener('DOMContentLoaded', () => {

  // ================= 1. PEMUTAR MUSIK =================
  const audio = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  const playIcon = document.getElementById('play-icon');
  const musicStatus = document.getElementById('music-status');
  const equalizer = document.getElementById('equalizer');

  if (audio && playBtn) {
    playBtn.addEventListener('click', () => {
      // Toggle play / pause audio
      if (audio.paused) {
        audio.play().then(() => {
          playIcon.textContent = '❚❚'; // Ganti icon ke pause
          musicStatus.textContent = 'Memutar Musik...';
          equalizer.classList.add('playing');
        }).catch(err => {
          // Menangani kemungkinan pemblokiran autoplay oleh browser
          console.warn('Autoplay dicegah oleh browser:', err);
          musicStatus.textContent = 'Gagal memutar (Klik lagi)';
        });
      } else {
        audio.pause();
        playIcon.textContent = '▶'; // Ganti icon ke play
        musicStatus.textContent = 'Dijeda';
        equalizer.classList.remove('playing');
      }
    });

    // Reset ikon jika lagu selesai diputar
    audio.addEventListener('ended', () => {
      playIcon.textContent = '▶';
      musicStatus.textContent = 'Selesai';
      equalizer.classList.remove('playing');
    });
  }

  // ================= 2. SMOOTH SCROLL NAVBAR =================
  // Memastikan perpindahan halaman halus saat link navigasi diklik
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ================= 3. REVEAL ON SCROLL (ANIMASI HALUS) =================
  // Menggunakan Intersection Observer API bawaan browser (ringan & tanpa library)
  const cards = document.querySelectorAll('.skill-card, .timeline-item, .about-card, .music-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // Hanya animasikan sekali
      }
    });
  }, observerOptions);

  // Set style inisial untuk elemen animasi
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(card);
  });

});
