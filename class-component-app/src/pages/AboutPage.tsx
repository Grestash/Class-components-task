import AppInfo from '../components/AboutPage/AppInfo';
import Technologies from '../components/AboutPage/Technologies';
import AuthorInfo from '../components/AboutPage/AuthorInfo';
import Footer from '../components/AboutPage/Footer';
import './AboutPage.css'

export default function AboutPage() {
  return (
    <div className="aboutWrapper">
      <AppInfo />
      <Technologies />
      <AuthorInfo />
      <Footer />
    </div>
  );
}
