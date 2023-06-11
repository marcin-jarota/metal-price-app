import { LitElement, html } from "lit";
import { selectInput } from "../../styles/input";

export default class ItemRuleSelector extends LitElement {
  constructor() {
    super();
    this.metals = [];
    this.itemIsRules = [];
    this.selectedItemRule = {};
  }

  static get properties() {
    return {
      metals: {
        type: Array,
      },
      itemIsRules: {
        type: Array,
      },
      selectedItemRule: {
        type: Object,
      },
    };
  }

  static get styles() {
    return [selectInput];
  }

  static get htmlElementName() {
    return "item-rule-selector";
  }

  render() {
    return html`
      <select
        @change="${({ target: { value } }) =>
          this._handleSelectChanhe("key", value)}"
      >
        ${this.itemIsRules.map(this._renderItemRulesOption.bind(this))}
      </select>
      <select
        @change="${({ target: { value } }) =>
          this._handleSelectChanhe("value", value)}"
      >
        ${this._renderMetalOptions()}
      </select>
    `;
  }

  _handleSelectChanhe(ruleKey, value) {
    this.selectedItemRule[ruleKey] = value;
    this.dispatchEvent(
      new CustomEvent("item-rule-update", { detail: this.selectedItemRule })
    );
  }

  _renderItemRulesOption(rule) {
    const isSelected = this.selectedItemRule.key === rule.key;

    return isSelected
      ? html`<option value="${rule.key}" selected>${rule.description}</option>`
      : html`<option value="${rule.key}">${rule.description}</option>`;
  }

  _renderMetalOptions() {
    const selectedMetal = this.selectedItemRule.value || "";

    return this.metals.map((metal) => {
      return metal === selectedMetal
        ? html`<option value="${metal}" selected>${metal}</option>`
        : html`<option value=${metal}>${metal}</option>`;
    });
  }
}
