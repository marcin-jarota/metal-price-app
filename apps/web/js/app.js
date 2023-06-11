import { LitElement, html, css } from "lit";
import { notificationController } from "./controller/NotificationController";

export class ApplicationRoot extends LitElement {
  constructor() {
    super();
    
  }

  static get styles() {
    return css`
      main {
        display: flex;
        flex-direction: column;
      }

      aside {
        background-color: #ECF0F1;
      }

      button {
        background-color: transparent;
        text-decoration: underline;
        border: none;
        cursor: pointer;
        color: #2C3E50;
      }

      @media(min-width: 1200px) {
        main {
          flex-direction: row;
          max-width: 1200px;
          margin: 0 auto;
        }

        aside {
          min-width: 30%;
        }
      }
    `
  }

  static get htmlElementName() {
    return "app-root";
  }

  connectedCallback() {
    super.connectedCallback();
    notificationController.fetchNotifications();
  }

  resetCurrentNotification() {
    notificationController.clearSelectedNotification();
  }

  render() {
    return html`
      <main>
        <aside>
          <button @click="${this.resetCurrentNotification}">
            Dodaj nowe powiadomienie
          </button>
          <notifications-list></notifications-list>
        </aside>
        <notification-form></notification-form>
      </main>
    `;
  }
}
