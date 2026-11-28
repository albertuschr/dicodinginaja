import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import Kenapa from './sections/Kenapa.jsx';
import BuatSiapa from './sections/BuatSiapa.jsx';
import Produk from './sections/Produk.jsx';
import Demo from './sections/Demo.jsx';
import Project from './sections/Project.jsx';
import Testimoni from './sections/Testimoni.jsx';
import Faq from './sections/Faq.jsx';
import Cta from './sections/Cta.jsx';
import Footer from './sections/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';

export default function App() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <Kenapa />
      <BuatSiapa />
      <Produk />
      <Demo />
      <Project />
      <Testimoni />
      <Faq />
      <Cta />
      <Footer />
      <ChatWidget />
    </div>
  );
}
