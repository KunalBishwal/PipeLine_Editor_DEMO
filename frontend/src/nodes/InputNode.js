// src/nodes/InputNode.js
import BaseNode from './BaseNode'; 

const InputNode = ({ id, data, selected }) => {
  const nodeData = {
    ...data,
    title: "Input",
    icon: "📥",
    color: '#34d399',
    fields: [
      { label: "Text", type: "text", fieldName: "text" }
    ],
    handles: {
      source: [{ id: "output" }]
    }
  };
  return <BaseNode id={id} data={nodeData} selected={selected} />;
};

export default InputNode;