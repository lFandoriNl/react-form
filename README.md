# @fandorin/react-form

## Introduction

Welcome to the React Form Management Library! This library is designed to simplify and streamline the process of form management in your React applications. It is lightweight, fast, and offers a small bundle size to ensure your application remains performant.

### Features

**Fast Speed**: This library is optimized for speed, ensuring your forms load and respond quickly.
Small Bundle Size: We've kept the library lean to minimize the impact on your application's load time.

**Expandable Capabilities**: The library is designed to be extensible, allowing you to add plugins to enhance its functionality.

**React Compatibility**: This library is built specifically for React, ensuring seamless integration with your React applications.
Installation

## Installation

To install the @fandorin/react-form, use the following command:

```
npm i @fandorin/react-form
```

## Usage

Here's a basic example of how to use the library:

```ts
import { Form, useForm, Controller } from '@fandorin/react-form';

const form = new Form({
  fields: {
    name: '',
    email: '',
  },
});

const App = () => {
  const { control, handleSubmit } = useForm(form);

  const onSubmit = handleSubmit((data, event) => {
    event.preventDefault();

    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <input {...field} />}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```

### Various use cases

- [Base](./app/src/base.tsx)
- [Set focus](./app/src/set-focus.tsx)
