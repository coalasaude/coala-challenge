import { TextField } from '@mui/material';

type Props = {
  label: string;
  value: unknown;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  multiline?: boolean;
  minRows?: number;
};

export default function WInput({ type, label, value, required, multiline, minRows, onChange }: Props) {
  return (
    <TextField
      variant="outlined"
      size="small"
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      required={required}
      multiline={multiline}
      minRows={minRows}
      fullWidth
    />
  );
}
