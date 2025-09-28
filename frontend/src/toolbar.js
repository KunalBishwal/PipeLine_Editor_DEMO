// src/toolbar.js
import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = () => (
  <div className="pipeline-toolbar">
    <div className="toolbar-header">
      <h2 className="toolbar-title">Nodes</h2>
    </div>
    <div className="toolbar-nodes-list">
      <DraggableNode type='customInput' label='Input' />
      <DraggableNode type='llm' label='LLM' />
      <DraggableNode type='customOutput' label='Output' />
      <DraggableNode type='text' label='Text' />
      <DraggableNode type='logger' label='Logger' />
      <DraggableNode type='keywordExtractor' label='Keyword Extractor' />
      <DraggableNode type='randomChoice' label='Random Choice' />
      <DraggableNode type='timer' label='Timer' />
      <DraggableNode type='math' label='Math' />
    </div>
  </div>
);