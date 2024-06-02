export default function Input({
  label,
  value,
  name,
  onChange,
  ...props
}: {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center">
      <label htmlFor={name} className="pr-2">
        {label}:
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        className="border-b-2 bg-transparent"
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
