// src/nodes/LoggerNode.js
import BaseNode from './BaseNode';

const LoggerNode = ({ id, data, selected }) => {
  const nodeData = {
    ...data,
    title: "Logger",
    icon: "📄",
    color: "#f97316",
    fields: [
      { label: "Message", type: "textarea", fieldName: "message" },
      { buttonLabel: "Log", type: "button", fieldName: "logBtn" }
    ],
    handles: {
      target: [{ id: "input" }],
    }
  };
  return <BaseNode id={id} data={nodeData} selected={selected} />;
};

export default LoggerNode;