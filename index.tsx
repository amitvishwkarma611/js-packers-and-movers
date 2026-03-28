import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';

console.log('Jaiswal Packers: Initializing boot sequence...');

const init = () => {
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Jaiswal Packers: Root container not found!');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('Jaiswal Packers: React mount successful.');
  } catch (error) {
    console.error('Jaiswal Packers: Mount failed:', error);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif;">
        <h2 style="color: #ef4444;">Failed to load application</h2>
        <p style="color: #64748b;">A technical error occurred during startup.</p>
        <pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 12px; display: inline-block; text-align: left; margin-top: 20px;">
${error instanceof Error ? error.message : String(error)}
        </pre>
        <br/>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 12px; font-weight: bold; cursor: pointer;">
          Retry Application
        </button>
      </div>
    `;
  }
};

// Handle potential race conditions with DOM loading
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Jaiswal Packers: SW registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Jaiswal Packers: SW registration failed:', error);
      });
  });
}
