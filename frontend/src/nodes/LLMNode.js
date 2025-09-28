// src/nodes/LLMNode.js
import BaseNode from './BaseNode';

const LLMNode = ({ id, data, selected }) => {
  const nodeData = {
    ...data,
    title: "LLM",
    icon: "🤖",
    color: '#60a5fa',
    fields: [
      { label: "Prompt", type: "textarea", fieldName: "prompt" }
    ],
    handles: {
      target: [{ id: "input" }],
      source: [{ id: "output" }]
    }
  };
  return <BaseNode id={id} data={nodeData} selected={selected} />;
};

export default LLMNode;