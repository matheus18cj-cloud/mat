'use strict';
document.documentElement.classList.add('js');
const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelector('#year').textContent = new Date().getFullYear();
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  menu.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia('(min-width: 651px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

let ticking = false;
function updateScroll() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? Math.min(100, window.scrollY / maxScroll * 100) : 0}%`;
  header.classList.toggle('scrolled', window.scrollY > 15);
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScroll);
    ticking = true;
  }
}, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('.section-anchor').forEach(section => sectionObserver.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}

const projects = {
  cafe: {
    title: 'Café & boas conexões',
    description: 'Uma identidade acolhedora para uma cafeteria. Tons quentes, tipografia expressiva e uma composição que convida a descobrir novos sabores.',
    image: 'assets/cafeteria.jpeg',
    alt: 'Imagem completa do projeto de cafeteria, com a frase Seu dia merece um café melhor e ilustração de uma xícara.'
  },
  vita: {
    title: 'VitaBella',
    description: 'Uma proposta visual para uma clínica estética. Fotografia em destaque, tons suaves e detalhes dourados que comunicam cuidado e bem-estar.',
    image: 'assets/vitabella.jpeg',
    alt: 'Imagem completa do projeto VitaBella, clínica estética, com tratamento facial em destaque.'
  },
  black: {
    title: 'Black Gold',
    description: 'Uma presença marcante para uma barbearia premium. Contraste, tipografia de impacto e uma identidade visual que coloca o estilo em primeiro lugar.',
    image: 'assets/black-gold.jpeg',
    alt: 'Imagem completa do projeto Black Gold Barbearia Premium, em preto e amarelo.'
  }
};
const dialog = document.querySelector('.project-dialog');
let dialogTrigger;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    dialogTrigger = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-description').textContent = project.description;
    const image = document.querySelector('#dialog-image');
    image.src = project.image;
    image.alt = project.alt;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
  });
});
document.querySelectorAll('.dialog-close, .dialog-close-bottom').forEach(button => {
  button.addEventListener('click', () => dialog.close());
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  dialogTrigger?.focus({ preventScroll: true });
});

const art = document.querySelector('.hero-art');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  art.addEventListener('pointermove', event => {
    if (reducedMotion.matches) return;
    const bounds = art.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    art.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`;
  });
  art.addEventListener('pointerleave', () => { art.style.transform = ''; });
}
