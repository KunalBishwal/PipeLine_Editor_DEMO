// src/nodes/OutputNode.js
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const nodeData = {
    ...data,
    title: "Output",
    icon: "📤",
    color: '#f87171',
    fields: [
      { label: 'Name', type: 'text', fieldName: 'name' },
      { label: 'Type', type: 'select', fieldName: 'outputType', options: ['Text', 'Image'] },
    ],
    handles: {
      target: [{ id: 'value' }],
    }
  };
  return <BaseNode id={id} data={nodeData} selected={selected} />;
};

export default OutputNode;