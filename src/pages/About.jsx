import AboutBio from '../components/AboutBio';
import Skills from '../components/Skills';
import profile from '../data/profile';
import skillCategories from '../data/skills';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about page-section">
      <div className="section-label">/about.md</div>
      {/* AboutPage owns the profile data and passes it to AboutBio (level 1),
          which drills profile.education down to Education (level 2). */}
      <AboutBio profile={profile} />
      <Skills categories={skillCategories} />
    </section>
  );
}
