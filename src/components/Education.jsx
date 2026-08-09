// Level 2 of prop drilling: AboutPage -> AboutBio -> Education
export default function Education({ education }) {
  return (
    <>
      <h3>Education</h3>
      <p>
        {education.degree} — {education.years}
        <br />
        {education.institution}
      </p>
    </>
  );
}
