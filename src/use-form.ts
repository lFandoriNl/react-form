import { FormEvent, useRef } from 'react';

import { Form } from './form';
import { Control, FieldValues } from './types';

export function useForm<FormData extends FieldValues>(form: Form<FormData>) {
  const formRef = useRef(form);

  const methodsRef = useRef({
    control: {
      getField: formRef.current.getField.bind(formRef.current),
    } as Control<FormData>,
    setFocus: (name: keyof FormData) => {
      methodsRef.current.getField(name).element?.focus();
    },
    isDirty: formRef.current.isDirty,
    getValues: formRef.current.getValues.bind(formRef.current),
    getFields: formRef.current.getFields.bind(formRef.current),
    getField: formRef.current.getField.bind(formRef.current),
    changeField: formRef.current.changeField.bind(formRef.current),
    resetFields: formRef.current.resetFields.bind(formRef.current),
    resetField: formRef.current.resetField.bind(formRef.current),
    handleSubmit: (callback: (data: FormData, event: FormEvent) => void) => {
      const onSubmit = (event: FormEvent) => {
        callback(methodsRef.current.getValues(), event);
      };

      return onSubmit;
    },
  });

  return methodsRef.current;
}
