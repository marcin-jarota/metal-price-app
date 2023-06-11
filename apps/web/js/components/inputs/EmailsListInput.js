import { LitElement, html, css } from "lit";
import { button } from "../../styles/button";
import { textInput } from "../../styles/input";

export default class EmailListInput extends LitElement {
  constructor() {
    super();
    this.emails = [];
  }

  static get properties() {
    return {
      emails: {
        type: Array,
      },
    };
  }

  static get styles() {
    return [
      textInput,
      button,
      css`
        .add-button {
          display: block;
          margin-top: 0.8rem;
        }
      `,
    ];
  }

  static get htmlElementName() {
    return "emails-input-list";
  }

  render() {
    const { emails } = this;
    return html`
      ${emails.map((email, index) => {
        return html`<div>
          <input
            type="email"
            required=""
            .value="${email}"
            @change="${({ target: { value } }) =>
              this._inputChanged(index, value)}"
          />
          <button
            type="button"
            @click="${() => this._deleteEmailFromList(email)}"
          >
            Usuń
          </button>
        </div>`;
      })}
      <button
        type="button"
        class="add-button"
        @click="${this._addEmptyEmailPlaceholder}"
      >
        Dodaj
      </button>
    `;
  }

  _inputChanged(inputIndex, value) {
    this.emails[inputIndex] = value;
    this._emitEvent();
  }

  _deleteEmailFromList(email) {
    this.emails = this.emails.filter((emailAddress) => emailAddress !== email);
    this._emitEvent();
  }

  _addEmptyEmailPlaceholder() {
    this.emails = [...this.emails, ""];
    this._emitEvent();
  }

  _emitEvent() {
    this.dispatchEvent(
      new CustomEvent("emails-changed", { detail: this.emails })
    );
  }
}
