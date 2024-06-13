export class Modal {
  constructor(button, modal, paragraph) {
    this.button = button;
    this.container = document.querySelector('.container');
    this.modal = modal;
    this.box = this.modal.querySelector('.c-dialog__box');
    this.paragraph = this.modal.querySelector('#dialog-desc');
    this.string = paragraph;
    this.btnsClose = this.modal.querySelectorAll(
      'button[data-dismiss="dialog"]'
    );
    this.focusableElementsArray = [
      '[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    this.focusableElements = this.modal.querySelectorAll(
      this.focusableElementsArray
    );
    this.firstElementFocusable = this.focusableElements[0];
    this.lastElementFocusable =
      this.focusableElements[this.focusableElements.length - 1];

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  openModal() {
    window.setTimeout(() => {
      this.focusableElements[0].focus();
    }, 100);
    this.paragraph.textContent = this.string;
    this.modal.setAttribute('aria-hidden', false);
    this.container.setAttribute('aria-hidden', true);
    document.addEventListener('keydown', this.handleKeydown);
  }

  closeModal() {
    this.modal.setAttribute('aria-hidden', true);
    this.container.setAttribute('aria-hidden', false);
    this.paragraph.textContent = '';
    document.removeEventListener('keydown', this.handleKeydown);
    this.button.focus();
  }

  handleKeydown(event) {
    console.log(event.target);
    if (event.key === 'Escape') {
      this.closeModal();
    }

    if (event.key === 'Tab') {
      if (event.shiftKey && event.target === this.firstElementFocusable) {
        event.preventDefault();
        this.lastElementFocusable.focus();
      } else if (
        !event.shiftKey &&
        event.target === this.lastElementFocusable
      ) {
          event.preventDefault();
        this.firstElementFocusable.focus();
      }
    }
  }

  handleEvents() {
    this.button.addEventListener('click', this.openModal);
    this.btnsClose.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        this.closeModal();
      });
    });
    this.modal.addEventListener('click', this.closeModal);
    this.box.addEventListener('click', (event) => event.stopPropagation());
  }
}
