import { DataTypes, ModelDefined } from "sequelize";
import {
  SequelizeDatabase,
  NotificationRepository,
  Notification,
} from "../types/index";

export const buildNotificationRepository = async (
  sequelizeDb: SequelizeDatabase,
  sync = true
): Promise<NotificationRepository> => {
  const notification: ModelDefined<
    Notification,
    Omit<Notification, "id">
  > = sequelizeDb.model.define("notification", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stakeholdersEmails: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    sendRules: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  if (sync) await notification.sync();

  return {
    async findAll(options = {}) {
      const notifications = await notification.findAll(options);

      return notifications.map((n) => n.toJSON());
    },
    async findOneByID(id: string) {
      const n = await notification.findOne({ where: { id } });

      if (n) return n.toJSON();

      return null;
    },
    async create(params: Omit<Notification, "id">) {
      const n = await notification.create(params);
      return n.toJSON();
    },
    delete(id: number) {
      return notification.destroy({ where: { id } });
    },
    async update(
      id: number,
      newNotification: Partial<Notification> & Omit<Notification, "id">
    ) {
      const updated = await notification.update(newNotification, {
        where: { id },
      });
      console.log(updated);
    },
  };
};
