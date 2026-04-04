type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <button className="rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90">
      {children}
    </button>
  );
}
