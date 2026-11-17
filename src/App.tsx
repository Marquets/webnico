import { FeelGood } from "./components/FeelGood/FeelGood";
import { Hero } from "./components/Hero/Hero";
import { SiteFooter } from "./components/SiteFooter/SiteFooter";
import { SiteNav } from "./components/SiteNav/SiteNav";
import { Tagline } from "./components/Tagline/Tagline";

export function App() {
  return (
    <>
      <SiteNav />
      <Hero />
      <main>
        <FeelGood />
      </main>
      {/* The closing invitation and the footer share one stretch of sand. */}
      <Tagline>
        <SiteFooter />
      </Tagline>
    </>
  );
}
