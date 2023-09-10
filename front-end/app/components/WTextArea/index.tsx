import WInput from '../WInput';

type Props = {
  label: string;
  value: unknown;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minRows?: number;
  required?: boolean;
};

export default function WTextArea({ label, value, onChange, minRows, required }: Props) {
  return (
    <WInput label={label} value={value} onChange={onChange} minRows={minRows || 4} multiline required={required} />
  );
}
