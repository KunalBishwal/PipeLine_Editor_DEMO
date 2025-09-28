# /backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes, edges):
    if not edges:
        return True
    adj = {node['id']: [] for node in nodes}
    for edge in edges:
        if edge['source'] in adj:
            adj[edge['source']].append(edge['target'])
    visiting = set()
    visited = set()

    def has_cycle(node_id):
        visiting.add(node_id)
        
        for neighbor in adj.get(node_id, []):
            if neighbor in visiting:
                return True 
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
        
        visiting.remove(node_id)
        visited.add(node_id)
        return False

    for node in nodes:
        if node['id'] not in visited:
            if has_cycle(node['id']):
                return False
    
    return True


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    

    dag_check_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_check_result
    }