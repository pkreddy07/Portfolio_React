// Level 2 of prop drilling: ProjectsPage -> ProjectCard -> TechTags
export default function TechTags({ tech }) {
  return (
    <div className="project-tags">
      {tech.map((item) => (
        <span key={item.name} className="tag" style={{ '--dot': item.dot }}>
          {item.name}
        </span>
      ))}
    </div>
  );
}
