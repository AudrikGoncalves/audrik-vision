import { Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="section-standard">
      <div className="container-content text-center">
        <div className="fade-in">
          <h2 className="text-section-title mb-8">
            Vamos construir o futuro juntos.
          </h2>
        </div>
        
        <div className="fade-in fade-in-delay-1">
          <p className="text-hero-subtitle mb-12">
            Para mais informações, entre em contato.
          </p>
        </div>
        
        <div className="fade-in fade-in-delay-2">
          <a 
            href="mailto:audrikduarte@gmail.com"
            className="button-apple inline-flex items-center"
          >
            <Mail className="w-5 h-5 mr-3" />
            audrikduarte@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;