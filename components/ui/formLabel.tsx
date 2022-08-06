export default function FormLabel({ htmlFor, label }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-sm font-medium text-gray-800 mt-10"
    >
      {label}
    </label>
  );
}
