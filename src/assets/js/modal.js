export class Modal {
  constructor(button, modal, paragraph) {
    this.button = button;
    this.modal = modal;
    this.paragraph = paragraph;
    this.btnClose = this.modal.querySelector('button[data-dismiss="dialog"]');
  }

  openModal() {
    const paragraph = this.modal.querySelector('#dialog-desc');
    paragraph.textContent = this.paragraph;
    this.modal.setAttribute('aria-hidden', false);
  }

  closeModal() {}

  handleEvents() {
    this.button.addEventListener('click', this.openModal);
    this.btnClose.addEventListener('click', this.closeModal);
  }
}
