import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

type Service = {
  title: string;
  description: string;
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="bg-gray-50 py-20">
      <Container>
        <SectionHeading title="Our Services" />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
