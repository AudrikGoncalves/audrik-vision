import HeroSection from "@/components/HeroSection";
import DataSection from "@/components/DataSection";
import ExcelSection from "@/components/ExcelSection";
import GallerySection from "@/components/GallerySection";
import DocumentationSection from "@/components/DocumentationSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <DataSection />
      <ExcelSection />
      <GallerySection />
      <DocumentationSection />
      <ContactSection />
    </main>
  );
};

export default Index;
