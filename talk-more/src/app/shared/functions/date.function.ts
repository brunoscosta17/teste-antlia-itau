import { DateTime } from 'luxon';

export const dateToString = (date: null | string) => {
  return date ? new Date(date).toLocaleDateString('pt-br') : null;
};

export const stringToDate = (date) => {
  return date ? new Date(date).toISOString() : null;
}