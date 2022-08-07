interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
}
export default function Button({ text, type, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="shadow bg-pink-500 hover:bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-5"
    >
      {text}
    </button>
  );
}
