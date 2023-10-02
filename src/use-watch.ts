import { useState, useEffect } from 'react';

import { Control, FieldValues } from './types';

export function useWatch<
  FormData extends FieldValues,
  Names extends Array<keyof FormData>,
>(names: Names, control: Control<FormData>) {
  const [state, setState] = useState(() => {
    return names.reduce(
      (acc, fieldName) => {
        acc[fieldName] = control.getField(fieldName).value;

        return acc;
      },
      {} as {
        [key in (typeof names)[number]]: FormData[key];
      },
    );
  });

  useEffect(() => {
    const fields = names.map(
      (fieldName) => [fieldName, control.getField(fieldName)] as const,
    );

    const offs = fields.map(([fieldName, field]) =>
      field.on('changed', ({ value }) =>
        setState((prev) => ({ ...prev, [fieldName]: value })),
      ),
    );

    return () => offs.forEach((off) => off());
  }, [names, control]);

  return state;
}
