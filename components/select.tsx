import { useId } from "react";

interface SelectProps {
  label?: string;
  value: string;
  onChange: any;
  options: any;
}

export default function Select({
  label,
  onChange,
  value,
  options,
}: SelectProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="mr-10 font-bold">
        {label}
      </label>
      <select id={id} onChange={onChange} value={value}>
        {options.map((option: any, index: number) => (
          <option value={option.value} key={index}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
