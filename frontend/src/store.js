import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';

const initialNodes = [
  { id: 'input-1', type: 'customInput', position: { x: 200, y: 200 }, data: { id: 'input-1', nodeType: 'customInput', title: "Input", icon: "📥", color: '#22c55e', fields: [{ label: "Text", type: "text", fieldName: "text", value: "Kunal" }], handles: { source: [{ id: "output" }] } } },
  { id: 'text-1', type: 'text', position: { x: 500, y: 200 }, data: { id: 'text-1', nodeType: 'text', title: "Text", icon: "📝", color: '#eab308', fields: [{ label: 'Text (use {{variable}} syntax)', type: 'textarea', fieldName: 'text', value: "Hello {{name}}!" }], handles: { source: [{ id: 'output' }], target: [{ id: 'var-name' }] } } }
];

export const useStore = create((set, get) => ({
  nodes: initialNodes,
  edges: [],
  nodeIDs: {},
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (!newIDs[type]) newIDs[type] = 0;
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    });
  },
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 } }, get().edges)
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => set({
    nodes: get().nodes.map(node => {
      if (node.id === nodeId) {
        const newData = { ...node.data, [fieldName]: fieldValue };
        return { ...node, data: newData };
      }
      return node;
    })
  }),
  updateTextNodeData: (nodeId, newText, newHandles) => set({
    nodes: get().nodes.map(node => {
        if (node.id === nodeId) {
            const newData = { ...node.data, text: newText, handles: newHandles };
            return { ...node, data: newData };
        }
        return node;
    })
  })
}));