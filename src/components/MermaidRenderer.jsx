import { useEffect, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
});

export default function MermaidRenderer({ diagram = '' }) {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;
    setError('');

    if (!diagram.trim()) {
      setSvg('');
      return undefined;
    }

    const renderDiagram = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(`mermaid-${Math.random().toString(36).slice(2)}`, diagram);
        if (isActive) {
          setSvg(renderedSvg);
        }
      } catch (err) {
        if (isActive) {
          setError('Unable to render Mermaid diagram. Please verify the syntax.');
          setSvg('');
          console.error(err);
        }
      }
    };

    renderDiagram();

    return () => {
      isActive = false;
    };
  }, [diagram]);

  if (!diagram.trim()) {
    return null;
  }

  if (error) {
    return <p className="rounded-xl border border-red-300 bg-red-100/70 p-4 text-sm text-red-700 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-200">{error}</p>;
  }

  return <div className="mermaid" dangerouslySetInnerHTML={{ __html: svg }} />;
}
