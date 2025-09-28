// src/nodes/MathNode.js
import BaseNode from './BaseNode';

const MathNode = ({ id, data, selected }) => {
  const nodeData = {
    ...data,
    title: "Math",
    icon: "🧮",
    color: "#84cc16",
    fields: [
      { label: "Number", type: "number", fieldName: "number" },
      { label: "Operation", type: "select", fieldName: "operation", options: ["Add", "Subtract", "Multiply", "Divide"] },
      { buttonLabel: "Compute", type: "button", fieldName: "computeBtn" }
    ],
    handles: {
      target: [{ id: "input" }],
      source: [{ id: "output" }]
    }
  };
  return <BaseNode id={id} data={nodeData} selected={selected} />;
};

export default MathNode;