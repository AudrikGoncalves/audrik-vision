import heroBuilding from "@/assets/hero-building.jpg";

const HeroSection = () => {
  const scrollToNext = () => {
    document.getElementById('data-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${heroBuilding})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      
      {/* Content */}
      <div className="relative z-10 text-center container-content">
        <div className="fade-in">
          <h1 className="text-hero mb-4">
            Projeto Audrik
          </h1>
        </div>
        
        <div className="fade-in fade-in-delay-1">
          <p className="text-hero-subtitle mb-12">
            Edifício Vertical 6° Período
          </p>
        </div>
        
        <div className="fade-in fade-in-delay-2">
          <button 
            onClick={scrollToNext}
            className="link-apple text-lg flex items-center justify-center mx-auto group"
          >
            Explore o projeto
            <span className="ml-2 transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;