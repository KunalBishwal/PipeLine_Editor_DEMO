// src/nodes/RandomChoiceNode.js
import BaseNode from './BaseNode';

const RandomChoiceNode = ({ id, data, selected }) => {
  const nodeData = {
    ...data,
    title: "Random Choice",
    icon: "🎲",
    color: "#a855f7", 
    fields: [
      { label: "Options (comma-separated)", type: "text", fieldName: "options" },
      { buttonLabel: "Pick", type: "button", fieldName: "pickBtn" }
    ],
    handles: {
      target: [{ id: "input" }],
      source: [{ id: "output" }]
    }
  };
  return <BaseNode id={id} data={nodeData} selected={selected} />;
};

export default RandomChoiceNode;