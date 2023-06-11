import { LitElement, html, css } from "lit";
import { notificationController } from "../controller/NotificationController";
import { NotificationRequest } from "../service/NotificationRequest";
import { button } from "../styles/button";
import { textArea, textInput } from "../styles/input";

export class NotificationForm extends LitElement {
  constructor() {
    super();
    this._notificationRequest = new NotificationRequest();
    this._notification = { ...notificationController.emptyNotification };
    this._allPriceRules = [];
    this._allItemRules = [];
    this._metals = [];
    this._loadingRules = true;
    this._fetchRulesError = false;
    this._selectedItemIsRule = {
      key: "item_is",
      value: "silver",
    };

    notificationController.onNotificationSelect(
      this.changeCurrentNotification.bind(this)
    );
  }

  static get styles() {
    return [
      textInput,
      textArea,
      button,
      css`
        :host {
          width: 100%;
        }

        form {
          display: flex;
          flex-direction: column;
          max-width: 75%;
          padding: 1rem;
          margin: 0 auto;
        }

        label {
          font-weight: bold;
          color: #2c3e50;
          font-family: "Arial", sans-serif;
          padding: 0.5rem 0;
        }

        button {
          margin-top: 1rem;
        }

        @media (min-width: 1200px) {
          form {
            margin: 0;
          }
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchRulesList();
  }

  static get properties() {
    return {
      _notification: {
        type: Object,
      },
      _allPriceRules: {
        type: Array,
      },
      _loadingRules: {
        type: Boolean,
      },
      _selectedItemIsRule: {
        type: Object,
      },
    };
  }

  static get htmlElementName() {
    return "notification-form";
  }

  render() {
    const { title, stakeholdersEmails, content, sendRules } =
      this._notification;

    const selectedSendRules = sendRules.filter(
      ({ isPriceRule }) => isPriceRule
    );

    return html`
      <form @submit="${this._submit}">
        <label for="title">Tytuł</label>
        <input
          id="title"
          .value="${title}"
          @change="${({ target: { value } }) =>
        this._handleInputChange("title", value)}"
        />
        <label>
          <span>Odbiorcy</span>
          <emails-input-list
            .emails="${stakeholdersEmails}"
            @emails-changed="${this._updateEmailsList}"
          ></emails-input-list>
        </label>
        <label for="notificationContent">Treść</label>
        <textarea
          id="notificationContent"
          .value="${content}"
          @change=${({ target: { value } }) =>
        this._handleInputChange("content", value)}
        ></textarea>
        <label>Reguły wysyłki:</label>
        ${this._fetchRulesError
        ? html`<div>
              <span>Nie udało się obrać reguł.</span>
              <button @click="${this._fetchRulesList}">Spróbuj ponownie</button>
            </div>`
        : null}
        ${this._loadingRules
        ? html`<span>ładowanie reguł...</span>`
        : html` <item-rule-selector
                .metals="${this._metals}"
                .selectedItemRule="${this._selectedItemIsRule}"
                .itemIsRules="${this._allItemRules}"
                @item-rule-update="${this._updateItemIsRule}"
              ></item-rule-selector>

              <price-rule-selector
                .selectedPriceRules="${selectedSendRules}"
                .allowedPriceRules="${this._allPriceRules}"
                @price-rules-changed="${this._updatePriceRules}"
              ></price-rule-selector>`}
        <button>Zapisz</button>
      </form>
    `;
  }

  changeCurrentNotification(notification) {
    this._notification = { ...notification };
    this._selectedItemIsRule = notification.sendRules.find(
      ({ isPriceRule }) => !isPriceRule
    ) || {
      key: "item_is",
      value: "silver",
    };
  }

  async _fetchRulesList() {
    try {
      const { rules, metals } =
        await this._notificationRequest.getSendRulesList();

      this._metals = metals;
      this._allPriceRules = rules.filter(({ isPriceRule }) => isPriceRule);
      this._allItemRules = rules.filter(({ isPriceRule }) => !isPriceRule);

      this._loadingRules = false;
      this._fetchRulesError = false;
    } catch (err) {
      console.log(err);
      this._fetchRulesError = true;
    }
  }

  async _submit(e) {
    e.preventDefault();

    if (!this._isValid()) {
      window.notie.alert({
        type: 'error',
        text: 'Niepoprawnie wypełniony formularz'
      });
      return;
    }

    const payload = {
      ...this._notification,
      sendRules: [...this._notification.sendRules, this._selectedItemIsRule],
    };

    const isUpdate = Object.prototype.hasOwnProperty.call(payload, "id");

    try {
      if (isUpdate) {
        await this._notificationRequest.updateNotification(payload.id, payload);
      } else {
        const response = await this._notificationRequest.createNotification(
          payload
        );

        this._notification = response
      }
    } catch (err) {
      err?.response?.data?.errors?.forEach(({ msg }) => {
        window.notie.alert({
          type: 'error',
          text: msg
        })
      })
      return
    }

    await notificationController.fetchNotifications();

    window.notie.alert({
      type: "success",
      text: "Dane zapisane pomyślnie!",
    });
  }

  _isValid() {
    const { title, content, stakeholdersEmails, sendRules } =
      this._notification;

    const isEmpty = [
      title.trim().length,
      content.trim().length,
      stakeholdersEmails.length,
      sendRules.length,
    ].includes(0);

    return !isEmpty;
  }

  _handleInputChange(field, value) {
    this._notification[field] = value;
  }

  _updateEmailsList({ detail: emails }) {
    this._notification.stakeholdersEmails = [...emails];
  }

  _updatePriceRules({ detail: updatedData }) {
    this._notification.sendRules = [...updatedData];
  }

  _updateItemIsRule({ detail: isItemRule }) {
    this._selectedItemIsRule = isItemRule;
  }
}
