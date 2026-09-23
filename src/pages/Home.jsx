import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProduct";
import Hero from "../components/Hero";
import Newsletter from "../components/NewsLetter";
import PromoBanners from "../components/PromoBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanners />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
}
