import { Document } from "@/model/document";

type TreeNodeProps = {
  document: Document;
  children?: any;
  setActive: (document: Document) => void;
  documentSelected: boolean;
  isExpanded: boolean;
  setExpand: (document: any) => void;
};

export default function TreeNode(props: TreeNodeProps) {
  const handleTreeNodeClick = (document: Document) => {
    document.isSelected
      ? document.unselectDocument()
      : document.selectDocument();
    props.setActive(document);
    props.setExpand(document);
  };

  return (
    <div className={`w-full cursor-pointer`}>
      <span
        className={`w-full block ${
          props.documentSelected ? "bg-[#3F3D6B] text-white" : ""
        }`}
        style={{
          paddingLeft: `${props.document.level * 12}px`,
          paddingBottom: "5px",
          paddingTop: "5px",
        }}
        onClick={() => handleTreeNodeClick(props.document)}
      >
        {props.document?.name}
      </span>
    </div>
  );
}
