import { FormField } from './form-field';

import { FieldValues, Override } from './types';

export type FormOptions<T> = {
  fields: T;
};

export class Form<FormData extends FieldValues> {
  private fields: {
    [name in keyof FormData]: FormField<FormData[name]>;
  };

  constructor(private options: FormOptions<FormData>) {
    this.fields = Object.fromEntries(
      Object.entries(options.fields).map(([name, value]) => {
        return [name, new FormField(value)];
      }),
    ) as Form<FormData>['fields'];
  }

  get isDirty() {
    return Object.values(this.fields).some(({ isDirty }) => isDirty);
  }

  getValues() {
    const result = Object.fromEntries(
      Object.entries(this.fields).map(([name, { value }]) => {
        return [name, value];
      }),
    );

    return result as FormData;
  }

  getFields() {
    return this.fields;
  }

  getField<T extends keyof FormData>(name: T) {
    return this.fields[name];
  }

  changeField<T extends keyof FormData>(name: T, value: FormData[T]) {
    this.fields[name].change(value);
  }

  resetFields() {
    return Object.values(this.fields).some((field) => field.reset());
  }

  resetField<T extends keyof FormData>(name: T) {
    return this.fields[name].reset();
  }

  handleSubmit(callback: (data: FormData) => void) {
    const onSubmit = () => {
      callback(this.getValues());
    };

    return onSubmit;
  }

  extend<ExtendFormData extends FieldValues>(
    options: FormOptions<ExtendFormData>,
  ) {
    return new Form<Override<FormData, ExtendFormData>>({
      fields: {
        ...this.options.fields,
        ...options.fields,
      },
    });
  }
}
