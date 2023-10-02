import { useRef } from 'react';

import { Form } from './form';
import { Control, FieldValues } from './types';

export function useForm<FormData extends FieldValues>(form: Form<FormData>) {
  const formRef = useRef(form);

  const methodsRef = useRef({
    control: {
      getField: formRef.current.getField.bind(formRef.current),
    } as Control<FormData>,
    isDirty: formRef.current.isDirty,
    getValues: formRef.current.getValues.bind(formRef.current),
    getFields: formRef.current.getFields.bind(formRef.current),
    getField: formRef.current.getField.bind(formRef.current),
    changeField: formRef.current.changeField.bind(formRef.current),
    resetFields: formRef.current.resetFields.bind(formRef.current),
    resetField: formRef.current.resetField.bind(formRef.current),
    handleSubmit: formRef.current.handleSubmit.bind(formRef.current),
  });

  return methodsRef.current;
}
