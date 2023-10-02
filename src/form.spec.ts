import { describe, it, expect, vi } from 'vitest';

import { Form } from './form';
import { FormField } from './form-field';

describe('Form', () => {
  it('should create form with fields', () => {
    const fields = {
      name: new FormField(''),
      email: new FormField(''),
      age: new FormField(null),
    };

    const form = new Form<{
      name: string;
      email: string;
      age: number | null;
    }>({
      fields: {
        name: '',
        email: '',
        age: null,
      },
    });

    expect(form.getFields()).toEqual(fields);
  });

  it('should change field value', () => {
    const form = new Form({
      fields: {
        name: '',
      },
    });

    expect(form.getField('name').value).toBe('');

    form.changeField('name', 'My name');

    expect(form.getField('name').value).toBe('My name');
  });

  it('should mark the field as dirty', () => {
    const form = new Form({
      fields: {
        name: '',
      },
    });

    form.changeField('name', 'My name');

    expect(form.getField('name').isDirty).toBe(true);

    form.changeField('name', '');

    expect(form.getField('name').isDirty).toBe(false);
  });

  it('should reset field value', () => {
    const form = new Form({
      fields: {
        name: '',
      },
    });

    form.changeField('name', 'My name');

    expect(form.getField('name').isDirty).toBe(true);
    expect(form.isDirty).toBe(true);

    form.resetField('name');

    expect(form.getField('name').isDirty).toBe(false);
    expect(form.isDirty).toBe(false);
  });

  it('should reset fields value', () => {
    const form = new Form({
      fields: {
        name: '',
        age: 0,
      },
    });

    form.changeField('name', 'My name');
    form.changeField('age', 42);

    expect(form.isDirty).toBe(true);

    form.resetFields();

    expect(form.isDirty).toBe(false);
  });

  it('should get data from onSubmit', () => {
    const form = new Form({
      fields: {
        name: '',
        age: 0,
      },
    });

    const onSubmit = form.handleSubmit((data) => {
      expect(data).toEqual({
        name: '',
        age: 0,
      });
    });

    onSubmit();
  });

  it('should on listener to change field', () => {
    const form = new Form({
      fields: {
        name: '',
      },
    });

    const name = form.getField('name');

    name.change('My first name');

    const listener = vi.fn();

    name.on('changed', listener);

    name.change('My second name');

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith({ value: 'My second name' });
  });

  it('should off listener to change field', () => {
    const form = new Form({
      fields: {
        name: '',
      },
    });

    const name = form.getField('name');

    const listener = vi.fn();

    name.on('changed', listener);
    name.change('My first name');

    name.off('changed', listener);
    name.change('My second name');

    expect(listener).toBeCalledTimes(1);
    expect(listener).toBeCalledWith({ value: 'My first name' });
  });

  it('should skip identical values', () => {
    const form = new Form({
      fields: {
        name: '',
      },
    });

    const name = form.getField('name');

    name.change('My name');

    const listener = vi.fn();

    name.on('changed', listener);

    name.change('My name');

    expect(listener).toBeCalledTimes(0);
  });

  it('should extend base form', () => {
    const baseForm = new Form({
      fields: {
        name: '',
      },
    });

    const form = baseForm.extend({
      fields: {
        name: null,
        email: '',
      },
    });

    expect(form.getValues()).toEqual({
      name: null,
      email: '',
    });
  });
});
