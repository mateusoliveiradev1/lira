import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

if (typeof window !== 'undefined') {
  console.log(
    `%c
   __    __                  
  / /   / /  ___ __________ _
 / /__ / /__/ _ \`/ __/ __/ _ \`
/____//____/\_,_/_/  \__/\_,_/
                              
%cInspecionando nosso código? Você é curioso.
Que tal focar em escalar as suas vendas? Fale com a Lira Studio.
👉 https://liraconversao.com.br
`,
    "font-family: monospace; color: #D7FF00; font-size: 14px; font-weight: bold;",
    "font-family: sans-serif; color: #ffffff; font-size: 12px; padding-top: 10px;"
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#ff3333', background: '#0a0a0a', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>Application Crashed</h2>
          <pre>{this.state.error && this.state.error.toString()}</pre>
          <pre style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
