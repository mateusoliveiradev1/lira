import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

if (typeof window !== 'undefined') {
  console.log(
    "%c██╗     ██╗██████╗  █████╗ \n██║     ██║██╔══██╗██╔══██╗\n██║     ██║██████╔╝███████║\n██║     ██║██╔══██╗██╔══██║\n███████╗██║██║  ██║██║  ██║\n╚══════╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝",
    "color: #D7FF00; font-size: 12px; font-weight: bold; font-family: monospace; line-height: 1.4;"
  );
  console.log(
    "%c S T U D I O",
    "color: #D7FF00; font-size: 16px; font-weight: bold; letter-spacing: 12px; font-family: monospace;"
  );
  console.log(
    "%c─────────────────────────────────────",
    "color: #333; font-family: monospace;"
  );
  console.log(
    "%c⚡ Inspecionando nosso código?\n%c   Você tem bom gosto.\n\n%c💰 Enquanto você analisa pixels,\n%c   nossos clientes estão lucrando.\n\n%c→  https://liraconversao.com.br",
    "color: #fff; font-size: 13px; font-weight: bold; font-family: system-ui;",
    "color: #999; font-size: 12px; font-family: system-ui;",
    "color: #D7FF00; font-size: 13px; font-weight: bold; font-family: system-ui;",
    "color: #999; font-size: 12px; font-family: system-ui;",
    "color: #D7FF00; font-size: 11px; font-family: monospace; text-decoration: underline;"
  );
  console.log(
    "%c─────────────────────────────────────",
    "color: #333; font-family: monospace;"
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
