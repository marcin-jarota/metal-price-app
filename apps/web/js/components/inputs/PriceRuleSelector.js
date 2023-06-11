import { LitElement, html, css } from "lit";
import { button } from "../../styles/button";
import { selectInput, textInput } from "../../styles/input";

export default class PriceRuleSelector extends LitElement {
  constructor() {
    super();

    this.allowedPriceRules = [];
    this.selectedPriceRules = [];
  }

  static get properties() {
    return {
      selectedPriceRules: {
        type: Array,
      },
      allowedPriceRules: {
        type: Array,
      },
    };
  }

  static get styles() {
    return [
      selectInput,
      button,
      textInput,
      css`
        button {
          display: block;
          margin: 0.5rem 0;
        }
      `,
    ];
  }

  static get htmlElementName() {
    return "price-rule-selector";
  }

  render() {
    const { selectedPriceRules } = this;

    return html`
      ${selectedPriceRules.map(
        (rule, index) => html`
          <div>
            <select
              @change=${({ target: { value } }) =>
                this._handlePriceRuleSelect(index, value)}
            >
              ${this._renderPriceOptions(rule)}
            </select>
            <input
              type="number"
              .value="${rule.value}"
              @change="${({ target: { value } }) =>
                this._handleInputChange(index, value)}"
            />
          </div>
        `
      )}
      <button type="button" @click="${this._addPriceRule}">Dodaj</button>
    `;
  }

  _handlePriceRuleSelect(inputIndex, selectedRule) {
    this.selectedPriceRules[inputIndex].key = selectedRule;
    this._emitDataAndRerender();
  }

  _renderPriceOptions(rule) {
    return this.allowedPriceRules.map(({ key, description }) => {
      const isSelected = rule.key === key;

      return isSelected
        ? html`<option value="${key}" selected>${description}</option>`
        : html`<option value="${key}">${description}</option>`;
    });
  }

  _handleInputChange(index, value) {
    this.selectedPriceRules[index].value = value;
    this._emitDataAndRerender();
  }

  _addPriceRule() {
    const defaultKey = this.allowedPriceRules[0].key;
    this.selectedPriceRules = [
      ...this.selectedPriceRules,
      { key: defaultKey, value: "", isPriceRule: true },
    ];
  }

  _emitDataAndRerender() {
    this._emitEvent();
    this.requestUpdate();
  }

  _emitEvent() {
    this.dispatchEvent(
      new CustomEvent("price-rules-changed", {
        detail: this.selectedPriceRules,
      })
    );
  }
}
