import { Sequelize } from "sequelize";

export interface NotificationRepository {
  findAll(): Promise<Notification[]>;
  findOneByID(id: string): Promise<Notification | null>;
  create(notification: Omit<Notification, "id">): Promise<Notification>;
  update(
    id: number,
    notification: Partial<Notification> & Omit<Notification, "id">
  ): Promise<unknown>;
  delete(id: number): Promise<number>;
}

export interface SequelizeDatabase {
  model: Sequelize;
  initConnection(): Promise<void>;
}

export interface NotificationSheduler {
  pushNotification(n: Notification): Promise<number>
  popNotification(): Promise<Notification | null>
}

export enum RuleType {
  Price = "price",
  IS = "is",
}

export type SendRule = {
  isPriceRule?: string;
  description: string;
  key: string;
  value?: string | number;
  type: string;
};

export type Notification = {
  id: number;
  title: string;
  content: string;
  stakeholdersEmails: string[];
  sendRules: SendRule[];
};
