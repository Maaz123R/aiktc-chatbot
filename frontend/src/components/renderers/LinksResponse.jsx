import LinkCard from "./LinkCard";

export default function LinksResponse({ data }) {
  return (
    <div>
      <h4 style={{ marginBottom: 12 }}>
        {data.title}
      </h4>

      {data.links.map((link, i) => (
        <LinkCard
          key={i}
          title={link.title}
          url={link.url}
          icon={link.icon}
        />
      ))}
    </div>
  );
}