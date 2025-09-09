import bimDetail from "@/assets/bim-detail.jpg";
import lobbyInterior from "@/assets/lobby-interior.jpg";
import heroBuilding from "@/assets/hero-building.jpg";

const GallerySection = () => {
  const galleryItems = [
    {
      image: heroBuilding,
      text: "Design que inspira.",
      id: "design"
    },
    {
      image: bimDetail,
      text: "Precisão em cada detalhe.",
      id: "precision"
    },
    {
      image: lobbyInterior,
      text: "Espaços projetados para o bem-estar.",
      id: "spaces"
    }
  ];

  return (
    <>
      {galleryItems.map((item, index) => (
        <section 
          key={item.id}
          className="min-h-screen relative flex items-center justify-center"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content */}
          <div className="relative z-10 text-center container-content">
            <h2 className={`text-hero text-white fade-in`}>
              {item.text}
            </h2>
          </div>
        </section>
      ))}
    </>
  );
};

export default GallerySection;