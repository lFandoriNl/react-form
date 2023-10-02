import React, { ChangeEvent } from 'react';
import { Control, FieldValues } from './types';
import { useWatch } from './use-watch';

type ControllerProps<
  FormData extends FieldValues,
  Name extends keyof FormData,
> = {
  name: Name;
  control: Control<FormData>;
  render: (params: {
    field: {
      name: Name;
      value: FormData[Name];
      onChange: (
        event: ChangeEvent<HTMLInputElement>,
        value?: FormData[Name],
      ) => void;
      onBlur: () => void;
      ref: React.Ref<any>;
    };
  }) => React.ReactElement;
};

export function Controller<
  FormData extends FieldValues,
  Name extends keyof FormData,
>({ name, control, render }: ControllerProps<FormData, Name>) {
  const field = control.getField(name);

  const state = useWatch([name], control);

  return render({
    field: {
      name,
      value: state[name],
      onChange: (event, value) => {
        if (value) {
          return field.change(value);
        }

        if (event.target.type === 'checkbox') {
          // @ts-expect-error
          return field.change(event.target.checked);
        } else {
          // @ts-expect-error
          return field.change(event.target.value);
        }
      },
      onBlur: () => {},
      ref: (node) => {
        if (node) {
          field.element = node;
        }
      },
    },
  });
}
