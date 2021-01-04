import { DateTime } from 'luxon';

export const dateToString = (date: null | string) => {
  return new Date(date).toLocaleDateString('pt-br');
};

export const stringToDate = (date) => {
  return new Date(date).toISOString();
}