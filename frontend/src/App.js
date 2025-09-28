import { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ReactFlowProvider>
      <div className={`app-container ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
        <header className="app-header">
          <button 
            className="sidebar-toggle" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isSidebarOpen ? <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></> : <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>}
            </svg>
          </button>
          <span className="header-title">NodeFlux - Pipeline Editor</span>
        </header>
        <main className="app-main">
          <aside className="app-sidebar">
            <PipelineToolbar />
          </aside>
          <section className="app-canvas">
            <PipelineUI />
            <SubmitButton />
          </section>
        </main>
      </div>
    </ReactFlowProvider>
  );
}

export default App;