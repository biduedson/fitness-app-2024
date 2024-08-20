import HeroSlider from "./HeroSlider";

const Hero = () => {
  return (
    <section
      className="h-[100vh]  lg:h-[1000px] bg-hero bg-cover bg-center bg-no-repeat"
      id="home"
    >
      <div className="container mx-auto h-full">
        {/* slider */}
        <HeroSlider />
      </div>
    </section>
  );
};

export default Hero;
