import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Form, useForm, Controller } from '@fandorin/react-form';

const form = new Form({
  fields: {
    name: '',
    email: '',
  },
});

export function SetFocus() {
  const { control, handleSubmit, setFocus } = useForm(form);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmit = handleSubmit((data, event) => {
    event.preventDefault();

    console.log(data);
  });

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <Typography variant="h5">Base form example</Typography>

      <Controller
        name="name"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextField
            label="Name"
            variant="outlined"
            inputRef={ref}
            {...field}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextField
            label="Email"
            variant="outlined"
            inputRef={ref}
            {...field}
          />
        )}
      />

      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
