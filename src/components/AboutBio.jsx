import aboutImg from '../assets/images/profile-about.jpeg';
import Education from './Education';

// Level 1 of prop drilling: receives the full profile from AboutPage,
// then hands only the `education` slice further down to Education.
export default function AboutBio({ profile }) {
  return (
    <div className="about-content">
      <div className="about-photo">
        <img src={aboutImg} alt={`${profile.name} smiling in a casual photo`} />
      </div>
      <div className="about-text">
        {profile.bioParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 20)}>{paragraph}</p>
        ))}
        <Education education={profile.education} />
      </div>
    </div>
  );
}
