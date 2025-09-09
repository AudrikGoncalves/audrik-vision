const DataSection = () => {
  const stats = [
    { number: "15.000", label: "m² de área construída" },
    { number: "24", label: "Meses para conclusão" },
    { number: "85%", label: "Concluído" },
    { number: "Classe A", label: "Eficiência Energética" }
  ];

  return (
    <section id="data-section" className="section-standard">
      <div className="container-content">
        <div className="text-center mb-20">
          <h2 className="text-section-title fade-in">
            Números que definem o futuro.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center fade-in fade-in-delay-${index + 1}`}
            >
              <div className="text-number-large mb-2">
                {stat.number}
              </div>
              <div className="text-number-caption">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataSection;