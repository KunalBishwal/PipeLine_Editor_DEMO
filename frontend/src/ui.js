// src/ui.js
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import InputNode from './nodes/InputNode';
import LLMNode from './nodes/LLMNode';
import OutputNode from './nodes/OutputNode';
import TextNode from './nodes/TextNode';
import LoggerNode from './nodes/LoggerNode';
import KeywordExtractorNode from './nodes/KeywordExtractorNode';
import RandomChoiceNode from './nodes/RandomChoiceNode';
import TimerNode from './nodes/TimerNode';
import MathNode from './nodes/MathNode';

import 'reactflow/dist/style.css';

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  logger: LoggerNode,
  keywordExtractor: KeywordExtractorNode,
  randomChoice: RandomChoiceNode,
  timer: TimerNode,
  math: MathNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) return;
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appDataStr = event.dataTransfer.getData('application/reactflow');
      if (!appDataStr) return;
      const appData = JSON.parse(appDataStr);
      const type = appData?.nodeType;
      if (!type) return;
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      

      const initialData = {
          id: nodeID,
          nodeType: type,
          title: type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1').trim(),
          color: '#6366f1',
          icon: '⚙️',
          handles: {
            source: [{ id: 'output' }],
            target: []
          }
      };

     
      if (type === 'text') {
        initialData.text = 'Hello {{name}}!';
        initialData.handles.target = [{ id: 'var-name' }];
      }
      
      const newNode = {
        id: nodeID,
        type,
        position,
        data: initialData,
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        snapGrid={[20, 20]}
        connectionLineType="smoothstep"
      >
        <Background variant="dots" gap={20} size={1} color="#475569" />
        <Controls />
        <MiniMap 
          position="bottom-left" 
          nodeStrokeWidth={3} 
          zoomable 
          pannable 
          style={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
          }}
          nodeColor={(n) => {
            return n.data.color || '#6366f1';
          }}
        />
      </ReactFlow>
    </div>
  );
};