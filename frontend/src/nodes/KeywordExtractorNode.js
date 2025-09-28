// src/nodes/KeywordExtractorNode.js
import BaseNode from './BaseNode';

const KeywordExtractorNode = ({ id, data, selected }) => {
  const nodeData = {
    ...data,
    title: "Keyword Extractor",
    icon: "🔑",
    color: "#14b8a6",
    fields: [
      { label: "Text", type: "textarea", fieldName: "text" },
      { buttonLabel: "Extract", type: "button", fieldName: "extractBtn" }
    ],
    handles: {
      target: [{ id: "input" }],
      source: [{ id: "output" }]
    }
  };
  return <BaseNode id={id} data={nodeData} selected={selected} />;
};

export default KeywordExtractorNode;