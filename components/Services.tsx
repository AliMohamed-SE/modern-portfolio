import ServicesList from "./ui/ServicesList";

const Services = () => {
  return (
    <div id="services" className="py-20">
      <h1 className="heading">
        The
        <span className="text-purple"> services</span> I provide
      </h1>
      <ServicesList />
    </div>
  );
};

export default Services;
