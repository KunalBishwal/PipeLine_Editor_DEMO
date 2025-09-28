import BaseNode from './BaseNode';
import { useStore } from '../store';
import { Position } from 'reactflow';

const VARIABLE_REGEX = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;

export const TextNode = ({ id, data, selected }) => {
  const updateTextNodeData = useStore((state) => state.updateTextNodeData);

  const handleChange = (newText) => {
    const matches = [...newText.matchAll(VARIABLE_REGEX)];
    const uniqueVars = [...new Set(matches.map(match => match[1]))];
    
    const newTargetHandles = uniqueVars.map(variable => ({
      id: `var-${variable}`,
      position: Position.Left,
    }));
    
    const newHandles = {
      target: newTargetHandles,
      source: [{ id: 'output', position: Position.Right }],
    };

    updateTextNodeData(id, newText, newHandles);
  };

  const nodeData = {
    ...data,
    title: "Text",
    icon: "📝",
    color: '#eab308',
    fields: [
      { 
        label: 'Text (use {{variable}} syntax)', 
        type: 'textarea',
        fieldName: 'text',
        customChangeHandler: handleChange,
      },
    ],
    handles: data.handles || { source: [{ id: 'output', position: Position.Right }] },
  };

  return <BaseNode id={id} data={nodeData} selected={selected} />;
};

export default TextNode;