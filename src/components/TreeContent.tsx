import TreeNode from "./treeNode";
import { Document } from "@/model/document";

type TreeContentProps = {
  setActive: (document: Document) => void;
  documents: Document[];
  selectedDocument?: Document;
  expandedNodes: any;
  setExpandedNode: (document: any) => void;
};

export default function TreeContent(props: TreeContentProps) {
  const firstLevel = props.documents.filter((x: Document) => x.level == 1);

  const handleClick = (node: any) => {
    props.setExpandedNode(node);
  };

  const renderMenuItens = (documents: Document[]) => {
    return documents.map((document: Document, index) => (
      <div key={`${document.id}${document.name}`}>
        <TreeNode
          document={document}
          documentSelected={props.selectedDocument?.id === document.id}
          setActive={(x) => {
            props.setActive(x);
          }}
          isExpanded={props.expandedNodes[document.id]}
          setExpand={handleClick}
        ></TreeNode>
        {document.linkedDocuments &&
          props.expandedNodes[document.id] &&
          renderMenuItens(document.linkedDocuments)}
      </div>
    ));
  };

  return <div>{renderMenuItens(firstLevel)}</div>;
}
