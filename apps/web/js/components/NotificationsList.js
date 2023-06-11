import { LitElement, html, css } from "lit";
import { notificationController } from "../controller/NotificationController";

export class NotificationsList extends LitElement {
  constructor() {
    super();
    this.notificationsList = [];
    this._selectedNotificationID = null;
    notificationController.onListChange(this.updateList.bind(this));
  }

  static get properties() {
    return {
      notificationsList: { type: Array },
      _selectedNotificationID: {
        type: Number,
      },
    };
  }

  static get styles() {
    return css`
      ul {
        list-style: none;
        margin: 0;
        padding: 1rem;
      }

      li {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        display: inline-flex;
        cursor: pointer;
        max-width: 5%;
        color: red;
      }

      span,
      button {
        width: 100%;
        padding: 0.5rem;
        border: 0;
        background-color: transparent;
        cursor: pointer;
        transition: background-color 0.5s;
      }

      button.active,
      button:hover {
        background-color: #95a5a6;
      }
    `;
  }

  static get htmlElementName() {
    return "notifications-list";
  }

  render() {
    return html`
      <nav>
        <ul>
          ${this.notificationsList.map(
            ({ id, title }) =>
              html`<li>
                <button
                  class="${this._selectedNotificationID === id ? "active" : ""}"
                  @click="${() => this._setCurrentNotification(id)}"
                >
                  ${title}
                </button>
                <span @click="${() => this._deleteNotification(id)}">[X]</span>
              </li>`
          )}
        </ul>
      </nav>
    `;
  }

  updateList(list) {
    this.notificationsList = [...list];
  }

  async _setCurrentNotification(id) {
    try {
      await notificationController.selectNotification(id);
      this._selectedNotificationID = id;
    } catch (err) {
      notificationController.clearSelectedNotification();
    }
  }

  async _deleteNotification(id) {
    notie.confirm({
      text: 'Na pewno chcesz usunąć powiadomienie?',
      submitText: 'Tak',
      cancelText: 'Nie',
      submitCallback: async () => {
        notificationController.deleteNotification(id)
      }
    })
  }
}