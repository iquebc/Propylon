import {Document} from "@/model/document";

type TreeCardProps = {
  document: Document;
};

function renderCard(document: Document) {
  if (document.linkedDocuments.length > 0) {
    return document.linkedDocuments.map((x: Document) => {
      return (
        <div key={x.id} className="m-3">
          <h1 className="text-3xl">{x.name}</h1>
          <p>{x.content}</p>
        </div>
      );
    });
  }

  return <h1>No Results</h1>;
}

export default function TreeCard(props: TreeCardProps) {
  const { document } = props;
  return renderCard(document);
}
