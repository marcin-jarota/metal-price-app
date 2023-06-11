import axios from "axios";

export class NotificationRequest {
  constructor() {
    this._baseUrl = "http://localhost:3001/api";
  }

  async getNotificationsList() {
    const { data } = await axios.get(`${this._baseUrl}/notifications`);

    return data;
  }

  async getNotificationDetails(id) {
    const { data } = await axios.get(`${this.baseUrl}/notifications/${id}`);

    return data;
  }

  async getSendRulesList() {
    const { data } = await axios.get(`${this._baseUrl}/send-rules`);

    return data;
  }

  async updateNotification(id, updatedNotification) {
    const { data } = await axios.put(
      `${this._baseUrl}/notifications/${id}/update`,
      updatedNotification
    );

    return data;
  }

  async deleteNotification(id) {
    const { data } = await axios.delete(`http://localhost:3001/api/notifications/${id}/delete`);

    return data
  }

  async createNotification(notificationData) {
    const { data } = await axios.post(
      `${this._baseUrl}/notifications/create`,
      notificationData
    );

    return data;
  }
}
