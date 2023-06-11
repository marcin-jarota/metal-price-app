import { ApplicationRoot } from "./js/app";
import { NotificationForm } from "./js/components/NotificationForm";
import { NotificationsList } from "./js/components/NotificationsList";
import {
  EmailListInput,
  PriceRuleSelector,
  ItemRuleSelector,
} from "./js/components/inputs";

function registerComponents() {
  customElements.define(ItemRuleSelector.htmlElementName, ItemRuleSelector);
  customElements.define(PriceRuleSelector.htmlElementName, PriceRuleSelector);
  customElements.define(EmailListInput.htmlElementName, EmailListInput);
  customElements.define(NotificationsList.htmlElementName, NotificationsList);
  customElements.define(NotificationForm.htmlElementName, NotificationForm);
  customElements.define(ApplicationRoot.htmlElementName, ApplicationRoot);
}

window.addEventListener("DOMContentLoaded", registerComponents);
