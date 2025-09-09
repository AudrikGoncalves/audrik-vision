import React, { useState } from 'react';
import { FileText, Download, Upload } from "lucide-react";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

interface UploadedDocument {
  name: string;
  file: File;
  id: string;
}

const DocumentationSection = () => {
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const { toast } = useToast();

  const predefinedDocs = [
    { name: "Planta Baixa - Pavimento Tipo", id: "planta-tipo" },
    { name: "Corte AA", id: "corte-aa" },
    { name: "Corte BB", id: "corte-bb" },
    { name: "Fachada A", id: "fachada-a" },
    { name: "Fachada B", id: "fachada-b" },
    { name: "Memorial Descritivo", id: "memorial" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newDoc: UploadedDocument = {
        name: file.name,
        file: file,
        id: `uploaded-${Date.now()}-${Math.random()}`
      };
      
      setUploadedDocs(prev => [...prev, newDoc]);
    });

    toast({
      title: "Documentos carregados",
      description: `${files.length} documento(s) adicionado(s) com sucesso.`,
    });

    // Reset input
    event.target.value = '';
  };

  const handleDownload = (doc: UploadedDocument) => {
    const url = URL.createObjectURL(doc.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const allDocuments = [...predefinedDocs, ...uploadedDocs];

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
        
        {/* Upload Section */}
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.dwg"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
              multiple
            />
            <label htmlFor="pdf-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <div>
                  <Upload className="w-4 h-4 mr-2" />
                  Adicionar Documentos
                </div>
              </Button>
            </label>
          </div>
          <p className="text-muted text-sm mt-2">
            Formatos aceitos: PDF, DOC, DOCX, DWG
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDocuments.map((doc, index) => {
            const isUploaded = 'file' in doc;
            return (
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
                
                {isUploaded ? (
                  <button 
                    onClick={() => handleDownload(doc as UploadedDocument)}
                    className="link-apple flex items-center justify-center mx-auto group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                ) : (
                  <div className="link-apple flex items-center justify-center mx-auto opacity-50">
                    <Download className="w-4 h-4 mr-2" />
                    Disponível em breve
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;