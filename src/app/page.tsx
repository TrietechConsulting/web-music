// app/page.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomeContent from "@/components/page/Home";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <HomeContent />
      </div>
      <Footer />
    </div>
  );
}
