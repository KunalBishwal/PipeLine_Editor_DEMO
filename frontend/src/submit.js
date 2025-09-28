// src/submit.js
import { useReactFlow } from 'reactflow';
import { useStore } from './store';
import './submit.css';

export const SubmitButton = () => {
    const { getEdges } = useReactFlow();
    const nodes = useStore((s) => s.nodes);

    const handleSubmit = async () => {
        const pipelineData = {
            nodes: nodes.map(({ id, type, position, data }) => ({ id, type, position, data })),
            edges: getEdges(),
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            // Format the result into a user-friendly message
            const message = `Pipeline Analysis Complete!
---------------------------------
Number of Nodes: ${result.num_nodes}
Number of Edges: ${result.num_edges}
Is it a valid DAG? ${result.is_dag ? '✅ Yes' : '❌ No (A cycle was detected!)'}`;
            
            alert(message);

        } catch (error) {
            console.error("Failed to submit pipeline:", error);
            alert("Submission Error: Could not connect to the backend. Please ensure it is running.");
        }
    };

    return (
      <div className="submit-btn-wrapper">
        <button onClick={handleSubmit} className="submit-btn">
            Submit Pipeline
        </button>
      </div>
    );
};