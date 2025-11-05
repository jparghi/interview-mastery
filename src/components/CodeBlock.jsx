import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-java.js';
import 'prismjs/themes/prism-tomorrow.css';

export default function CodeBlock({ code = '', language = 'java' }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  if (!code) {
    return null;
  }

  return (
    <pre className="overflow-x-auto rounded-2xl bg-slate-900/90 p-4 text-sm text-slate-100 shadow-inner">
      <code ref={codeRef} className={`language-${language}`}>
        {code.trim()}
      </code>
    </pre>
  );
}
