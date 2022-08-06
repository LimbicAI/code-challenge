interface SelectProps {
  options: Array<{ key: string, value: string }>;
  name: string;
  register: (name: string, validations?: any) => any;
  required?: boolean;
  value?: string;
}

export default function SelectInput({
  options, name, required = false, register, value,
}: SelectProps) {
  return (
    <div className="inline-block relative w-1/2">
      <select
        {...register(name, { required })}
        value={value}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 p-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
          >
            {o.text}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
  );
}
