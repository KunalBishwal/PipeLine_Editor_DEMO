// draggableNode.js
export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const nodeData = { nodeType };
      event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="draggable-node"
        draggable
        onDragStart={(e) => onDragStart(e, type)}
      >
        {label}
      </div>
    );
  };