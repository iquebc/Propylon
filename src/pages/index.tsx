import TreeContent from "@/components/TreeContent";
import TreeCard from "@/components/treeCard";
import { Document } from "@/model/document";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedDocument, setSelectedDocument] = useState<Document>();
  const [expandedNode, setExpandedNode] = useState({});
  const [data, setData] = useState<Document[]>([]);
  const URL_API = "http://localhost:3004/data";


  useEffect(() => {
    async function getDocuments() {
      const response = await fetch(URL_API);
      const jsonData = await response.json();
      const documents: Document[] = jsonData.content.document.map(
        (element: any) => {
          return Document.objToModel(element);
        }
      );
      setData(Document.jsonToTree(documents));
    }

    getDocuments();
  }, []);

  const borderStyle = `border-slate-300 border`;

  return (
    <div className="flex h-screen gap-6 p-12">
      <aside className={`flex-[1_0_20%] h-full overflow-y-auto ${borderStyle}`}>
        <TreeContent
          setActive={(x) => setSelectedDocument(x)}
          expandedNodes={expandedNode}
          documents={data}
          selectedDocument={selectedDocument}
          setExpandedNode={(x) => {
            setExpandedNode({
              ...expandedNode,
              [x.id]: !expandedNode[x.id],
            });
          }}
        ></TreeContent>
      </aside>
      <main className={`flex-[1_0_80%] overflow-y-auto ${borderStyle}`}>
        {selectedDocument && (
          <TreeCard key={selectedDocument.id} document={selectedDocument} />
        )}
      </main>
    </div>
  );
}
