export function ContactForm() {
  return (
    <form className="rounded-[2rem] border line surface p-8 shadow-premium">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Name</span>
          <input className="rounded-2xl border line surface-2 px-4 py-3 outline-none" placeholder="Your name" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Email</span>
          <input className="rounded-2xl border line surface-2 px-4 py-3 outline-none" placeholder="Your email" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Phone</span>
          <input className="rounded-2xl border line surface-2 px-4 py-3 outline-none" placeholder="Your phone" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Message</span>
          <textarea className="min-h-40 rounded-2xl border line surface-2 px-4 py-3 outline-none" placeholder="Tell us what you need" />
        </label>
        <button type="submit" className="rounded-2xl px-6 py-4 font-semibold text-white shadow-premium" style={{ background: 'var(--primary)' }}>
          Send Enquiry
        </button>
      </div>
    </form>
  );
}
