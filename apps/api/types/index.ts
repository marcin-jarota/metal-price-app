import { Sequelize } from "sequelize";

export interface RepositoryProxy<T> {
  findAll(): Promise<T[]>;
  findOneByID(id: string): Promise<T | null>;
  create(params: Omit<T, "id">): Promise<T>;
}

export interface Logger {
  info(msg: string): void;
}

export interface SequelizeDatabase {
  model: Sequelize;
  initConnection(): Promise<void>;
}

export interface Validator<T> {
  validate(a?: T, b?: T): boolean;
}

export type SendRule = {
  isPriceRule?: boolean;
  description: string;
  key: string;
};
