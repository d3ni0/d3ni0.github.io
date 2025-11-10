const createLightbox = () => {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML = `
    <figure>
      <button type="button" aria-label="Close preview">✕</button>
      <img src="" alt="" />
    </figure>
  `;
  document.body.appendChild(lightbox);
  return lightbox;
};

const initGallery = () => {
  const figures = document.querySelectorAll('.project-figure img');
  if (!figures.length) return;

  const lightbox = createLightbox();
  const image = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('button');

  const hideLightbox = () => {
    lightbox.classList.remove('is-visible');
    image.src = '';
    image.alt = '';
  };

  figures.forEach((figureImage) => {
    figureImage.addEventListener('click', () => {
      image.src = figureImage.src;
      image.alt = figureImage.alt || '';
      lightbox.classList.add('is-visible');
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', hideLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      hideLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-visible')) {
      hideLightbox();
    }
  });
};

document.addEventListener('DOMContentLoaded', initGallery);

