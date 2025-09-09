import { FileText, Download } from "lucide-react";

const DocumentationSection = () => {
  const documents = [
    { name: "Planta Baixa - Pavimento Tipo", id: "planta-tipo" },
    { name: "Corte AA", id: "corte-aa" },
    { name: "Corte BB", id: "corte-bb" },
    { name: "Fachada A", id: "fachada-a" },
    { name: "Fachada B", id: "fachada-b" },
    { name: "Memorial Descritivo", id: "memorial" }
  ];

  return (
    <section className="section-standard section-surface">
      <div className="container-content">
        <div className="text-center mb-20">
          <h2 className="text-section-title text-white fade-in mb-6">
            Documentação completa.
          </h2>
          <p className="text-hero-subtitle fade-in fade-in-delay-1">
            Acesse as plantas e os memoriais técnicos do projeto.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc, index) => (
            <div 
              key={doc.id}
              className={`bg-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group fade-in fade-in-delay-${(index % 3) + 1}`}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <FileText className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                {doc.name}
              </h3>
              
              <button className="link-apple flex items-center justify-center mx-auto group-hover:opacity-100 transition-opacity duration-300">
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;