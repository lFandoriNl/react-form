import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Form, useForm, Controller } from '@fandorin/react-form';

const form = new Form({
  fields: {
    name: '',
    email: '',
    age: '',
  },
});

export function Base() {
  const { control, handleSubmit } = useForm(form);

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
        render={({ field }) => (
          <TextField label="Name" variant="outlined" {...field} />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField label="Email" variant="outlined" {...field} />
        )}
      />

      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField label="Age" variant="outlined" {...field} />
        )}
      />

      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
