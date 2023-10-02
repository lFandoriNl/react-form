import { EventEmitter } from './event-emitter';

export class FormField<T> extends EventEmitter<{
  changed: { value: T };
}> {
  value: T;

  element?: HTMLElement;

  constructor(private initialValue: T) {
    super();

    this.value = initialValue;
  }

  get isDirty() {
    return this.value !== this.initialValue;
  }

  change(value: T) {
    if (this.value === value) return;

    this.value = value;

    this.emit('changed', { value });
  }

  reset() {
    this.value = this.initialValue;

    this.emit('changed', { value: this.initialValue });
  }
}
