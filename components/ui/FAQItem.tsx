export default function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm group" open={false}>
      <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">{question}</summary>
      <p className="mt-4 text-base leading-8 text-slate-600">{answer}</p>
    </details>
  );
}
