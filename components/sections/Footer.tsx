import Container from "@/components/ui/Container";

export default function Footer({
  siteName,
  location,
}: {
  siteName: string;
  location: string;
}) {
  return (
    <footer className="border-t py-8">
      <Container>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {siteName}. Serving {location}.
        </p>
      </Container>
    </footer>
  );
}
