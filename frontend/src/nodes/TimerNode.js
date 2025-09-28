// src/nodes/TimerNode.js
import BaseNode from './BaseNode';

const TimerNode = ({ id, data, selected }) => {
  const nodeData = {
    ...data,
    title: "Timer",
    icon: "⏱️",
    color: "#ec4899",
    fields: [
      { label: "Seconds", type: "number", fieldName: "seconds" },
      { buttonLabel: "Start", type: "button", fieldName: "startBtn" }
    ],
    handles: {
      target: [{ id: "input" }],
      source: [{ id: "output" }]
    }
  };
  return <BaseNode id={id} data={nodeData} selected={selected} />;
};

export default TimerNode;