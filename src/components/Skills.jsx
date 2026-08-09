import './Skills.css';

export default function Skills({ categories }) {
  return (
    <div className="skills">
      <h3>/skills.md</h3>
      {categories.map((category) => (
        <div className="skills-category" key={category.category}>
          <h4>{category.category}</h4>
          <div className="skills-grid">
            {category.skills.map((skill) => (
              <div className="skill-card" style={{ '--dot': skill.dot }} key={skill.name}>
                <img
                  className="skill-icon"
                  src={skill.icon}
                  alt={`${skill.name} logo`}
                  style={skill.invert ? { filter: `invert(${skill.invert === true ? 1 : skill.invert})` } : undefined}
                />
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
