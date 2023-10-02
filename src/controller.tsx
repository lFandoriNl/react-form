import React from 'react';
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
      onChange: (event: FormData[Name]) => void;
      onBlur: () => void;
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
      onChange: (event) => {
        field.change(event);
      },
      onBlur: () => {},
    },
  });
}
