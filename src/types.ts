import { Form } from './form';

export type FieldValues = {
  [key: string]: any;
};

export type Control<FormData extends FieldValues> = {
  getField: Form<FormData>['getField'];
};

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
