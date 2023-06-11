import { NotificationRequest } from "../service/NotificationRequest";

class NotificationController {
  constructor() {
    this._notificationRequest = new NotificationRequest();

    this._stateObservers = {
      onListChange: [],
      onNotificationSelect: [],
    };

    this._list = [];
    this._currentNotification = { ...this.emptyNotification };

    this.emptyNotification = {
      title: "",
      content: "",
      stakeholdersEmails: [],
      sendRules: [],
    };
  }

  onListChange(observer) {
    this._stateObservers.onListChange.push(observer);
  }

  onNotificationSelect(observer) {
    this._stateObservers.onNotificationSelect.push(observer);
  }

  _notify(event, data) {
    this._stateObservers[event].forEach((observer) => {
      try {
        observer(data);
      } catch (err) {
        console.log(err);
      }
    });
  }

  clearSelectedNotification() {
    this._currentNotification = { ...this.emptyNotification };
    this._notify("onNotificationSelect", this._currentNotification);
  }

  async fetchNotifications() {
    try {
      this._list = await this._notificationRequest.getNotificationsList();
    } catch (err) {
      this._list = [];
    }

    this._notify("onListChange", this._list);
  }

  async deleteNotification(id) {
    try {
      await this._notificationRequest.deleteNotification(id)
      this._list = this._list.filter(n => n.id !== id)
      this._notify("onListChange", this._list);

      notie.alert({
        type: 'success',
        text: 'Powiadomienie usunięte!'
      })
    } catch (err) {
      notie.alert({
        type: 'error',
        text: 'Nie udało się usunąć powiadomienia, spróbuj później'
      })
    }
  }

  async selectNotification(id) {
    this._currentNotification = this._list.find(
      (notification) => notification.id === id
    );

    if (!this._currentNotification) {
      this._currentNotification =
        await this._notificationRequest.getNotificationDetails(id);
    }

    this._notify("onNotificationSelect", this._currentNotification);
  }
}

export const notificationController = new NotificationController();
