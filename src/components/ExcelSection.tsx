import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card } from './ui/card';
import { Upload, FileSpreadsheet, Download } from 'lucide-react';
import { useToast } from './ui/use-toast';
import * as XLSX from 'xlsx';

interface ExcelData {
  fileName: string;
  sheets: {
    name: string;
    data: any[][];
  }[];
}

const ExcelSection = () => {
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const sheets = workbook.SheetNames.map(sheetName => ({
          name: sheetName,
          data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }) as any[][]
        }));

        const newExcelData: ExcelData = {
          fileName: file.name,
          sheets
        };

        setExcelData(prev => [...prev, newExcelData]);
        
        toast({
          title: "Excel carregado com sucesso",
          description: `${file.name} foi processado com ${sheets.length} planilha(s).`,
        });
      } catch (error) {
        toast({
          title: "Erro ao processar Excel",
          description: "Verifique se o arquivo está no formato correto.",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleZapierTrigger = async () => {
    if (!webhookUrl) {
      toast({
        title: "URL do Zapier necessária",
        description: "Por favor, insira a URL do seu webhook Zapier",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          projectData: excelData,
          triggered_from: window.location.origin,
        }),
      });

      toast({
        title: "Dados enviados",
        description: "Os dados do Excel foram enviados para o Zapier.",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Falha ao enviar dados para o Zapier.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setExcelData([]);
    toast({
      title: "Dados limpos",
      description: "Todas as tabelas foram removidas.",
    });
  };

  return (
    <section id="excel-section" className="section-standard bg-surface/30">
      <div className="container-content">
        <div className="text-center mb-20">
          <h2 className="text-section-title fade-in mb-6">
            Gestão inteligente de dados.
          </h2>
          <p className="text-body-large text-muted max-w-2xl mx-auto fade-in fade-in-delay-1">
            Carregue suas planilhas Excel para integrar dados do projeto com automações avançadas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Upload Section */}
          <Card className="p-8 bg-card/50 border-primary/20">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                <FileSpreadsheet className="w-8 h-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Upload de Excel</h3>
                <p className="text-muted text-sm">
                  Selecione arquivos .xlsx ou .xls para processar
                </p>
              </div>

              <div className="relative">
                <Input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="excel-upload"
                />
                <label htmlFor="excel-upload">
                  <Button variant="outline" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Selecionar Arquivo
                  </Button>
                </label>
              </div>
            </div>
          </Card>

          {/* Zapier Integration */}
          {excelData.length > 0 && (
            <Card className="p-6 bg-card/30 border-primary/20">
              <h3 className="text-lg font-semibold mb-4">Integração Zapier</h3>
              <div className="flex gap-4">
                <Input
                  placeholder="Cole aqui a URL do seu webhook Zapier"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleZapierTrigger}
                  disabled={isLoading}
                  className="shrink-0"
                >
                  {isLoading ? "Enviando..." : "Enviar para Zapier"}
                </Button>
              </div>
            </Card>
          )}

          {/* Data Display */}
          {excelData.length > 0 && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Dados Carregados ({excelData.length} arquivo{excelData.length > 1 ? 's' : ''})
                </h3>
                <Button variant="outline" onClick={clearData}>
                  Limpar Dados
                </Button>
              </div>

              {excelData.map((excel, excelIndex) => (
                <Card key={excelIndex} className="p-6 bg-card/30">
                  <div className="flex items-center gap-3 mb-4">
                    <FileSpreadsheet className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">{excel.fileName}</h4>
                  </div>

                  {excel.sheets.map((sheet, sheetIndex) => (
                    <div key={sheetIndex} className="mb-6 last:mb-0">
                      <h5 className="text-sm font-medium mb-3 text-muted">
                        Planilha: {sheet.name}
                      </h5>
                      
                      {sheet.data.length > 0 && (
                        <div className="rounded-lg border border-primary/20 overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                {(sheet.data[0] as any[])?.map((header: any, index: number) => (
                                  <TableHead key={index} className="text-xs bg-muted/30">
                                    {header || `Coluna ${index + 1}`}
                                  </TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {sheet.data.slice(1, 6).map((row: any[], rowIndex: number) => (
                                <TableRow key={rowIndex}>
                                  {row.map((cell: any, cellIndex: number) => (
                                    <TableCell key={cellIndex} className="text-xs">
                                      {cell?.toString() || ''}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          
                          {sheet.data.length > 6 && (
                            <div className="p-3 bg-muted/20 text-center text-xs text-muted">
                              ... e mais {sheet.data.length - 6} linha(s)
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExcelSection;