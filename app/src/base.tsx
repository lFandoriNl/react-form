import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Form, useForm, Controller } from '@fandorin/react-form';

const form = new Form({
  fields: {
    name: '',
    email: '',
    age: null as number | null,
  },
});

export function Base() {
  const { control } = useForm(form);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5">Base form example</Typography>

      <Controller
        name="name"
        control={control}
        render={({ field: { name, value, onChange, onBlur } }) => (
          <TextField
            label="Name"
            variant="outlined"
            name={name}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { name, value, onChange, onBlur } }) => (
          <TextField
            label="Email"
            variant="outlined"
            name={name}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        name="age"
        control={control}
        render={({ field: { name, value, onChange, onBlur } }) => (
          <TextField
            label="Age"
            variant="outlined"
            name={name}
            value={value || ''}
            onChange={(event) => onChange(Number(event.target.value))}
            onBlur={onBlur}
          />
        )}
      />
    </Box>
  );
}
