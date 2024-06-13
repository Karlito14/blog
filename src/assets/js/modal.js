export class Modal {
  constructor(button, modal, paragraph) {
    this.button = button;
    this.modal = modal;
    this.box = this.modal.querySelector('.c-dialog__box');
    this.paragraph = this.modal.querySelector('#dialog-desc');
    this.string = paragraph;
    this.btnsClose = this.modal.querySelectorAll(
      'button[data-dismiss="dialog"]'
    );
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  openModal() {
    this.paragraph.textContent = this.string;
    this.modal.setAttribute('aria-hidden', false);
    document.addEventListener('keydown', this.handleKeydown);
  }

  closeModal() {
    this.modal.setAttribute('aria-hidden', true);
    this.paragraph.textContent = '';
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.closeModal();
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
