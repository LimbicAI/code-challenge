export default function TextInput({
  name,
  placeHolder,
  register,
  required = false,
  multiLine = false,
  minLength = 0,
  isNumber = false,
}) {
  const validations = {};
  if (required) {
    validations.required = 'Required';
  }
  if (minLength > 0) {
    validations.minLength = { value: minLength, message: `At lease ${minLength} characters` };
  }
  if (isNumber) {
    validations.pattern = { value: /^\d+$/, message: 'Must be a number' };
  }

  return multiLine ? (

    <textarea
      rows={5}
      type="text"
      className="shadow appearance-none border rounded p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
      placeholder={placeHolder}
      {...register(name, validations)}
    />
  )
    : (
      <input
        type="text"
        className="shadow appearance-none border rounded p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
        placeholder={placeHolder}
        {...register(name, validations)}

      />
    );
}
