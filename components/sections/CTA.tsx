import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function CTA({ text }: { text: string }) {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-3xl bg-black p-10 text-white">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-4 max-w-2xl text-gray-300">{text}</p>
          <div className="mt-6">
            <Button>Contact Us</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
