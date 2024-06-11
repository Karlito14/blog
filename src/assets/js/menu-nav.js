const icon = document.querySelector('.menu-icon');
const header = document.querySelector('.header');
const headerNav = document.querySelector('.header__nav');
let menuNavOpen = false;
let mobileMenu = document.querySelector('#mobileMenu');

icon.addEventListener('click', (event) => {
  event.stopPropagation();
  menuNavOpen = !menuNavOpen;

  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.setAttribute('id', 'mobileMenu');
    mobileMenu.setAttribute('class', 'mobile-menu');

    const copyMenu = headerNav.children[0].cloneNode(true);
    mobileMenu.append(copyMenu);

    mobileMenu.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

  if (menuNavOpen) {
    header.append(mobileMenu);
  } else {
    mobileMenu.remove();
  }
});

window.addEventListener('click', (event) => {
  event.stopPropagation();
  if (menuNavOpen) {
    mobileMenu.remove();
    menuNavOpen = !menuNavOpen;
  }
});

window.addEventListener('resize', (event) => {
    if(window.innerWidth >= 768 && menuNavOpen) {
        mobileMenu.remove();
        menuNavOpen = !menuNavOpen;
    }
})
