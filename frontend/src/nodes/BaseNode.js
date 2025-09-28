// src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import { useStore } from '../store';
import TextareaAutosize from 'react-textarea-autosize';
import './BaseNode.css';
import '@reactflow/node-resizer/dist/style.css';

const BaseNode = ({ id, data, selected }) => {
  const { updateNodeField, removeNode } = useStore();

  const handleGenericChange = (fieldName, value) => {
    updateNodeField(id, fieldName, value);
  };

  return (
    <div className="base-node" style={{ border: `2px solid ${data.color || '#6366f1'}` }}>
      <NodeResizer isVisible={selected} minWidth={220} minHeight={150} />
      <div className="base-node-header">
        <div className="base-node-title"><span className="node-icon">{data.icon}</span>{data.title}</div>
      </div>
      <div className="base-node-content">
        <div className="fields-container">
          {data.fields?.map((field) => (
            <div key={field.fieldName} className="field-wrapper">
              {field.label && <label>{field.label}</label>}
              {field.type === 'text' && <input type="text" value={data[field.fieldName] || ''} onChange={(e) => handleGenericChange(field.fieldName, e.target.value)} />}
              
              {field.type === 'textarea' && 
                <TextareaAutosize 
                  minRows={3} 
                  className="autosize-textarea" 
                  value={data[field.fieldName] || ''} 
                  // If a custom handler exists (like for TextNode), use it. Otherwise, use the generic one.
                  onChange={(e) => field.customChangeHandler ? field.customChangeHandler(e.target.value) : handleGenericChange(field.fieldName, e.target.value)} 
                  onWheel={(e) => e.stopPropagation()} 
                />
              }

              {field.type === 'number' && <input type="number" value={data[field.fieldName] || 0} onChange={(e) => handleGenericChange(field.fieldName, e.target.value)} />}
              {field.type === 'select' && <select value={data[field.fieldName] || field.options[0]} onChange={(e) => handleGenericChange(field.fieldName, e.target.value)}>{field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}</select>}
              {field.type === 'button' && <button className="node-button">{field.buttonLabel}</button>}
            </div>
          ))}
        </div>
        <button onClick={() => removeNode(id)} className="remove-node-button" title="Remove node">Remove</button>
      </div>
      {data.handles?.target?.map((h, i) => <Handle key={h.id} type="target" position={Position.Left} id={h.id} style={{ top: `${(i + 1) * 100 / (data.handles.target.length + 1)}%` }} />)}
      {data.handles?.source?.map((h, i) => <Handle key={h.id} type="source" position={Position.Right} id={h.id} style={{ top: `${(i + 1) * 100 / (data.handles.source.length + 1)}%` }} />)}
    </div>
  );
};

export default BaseNode;