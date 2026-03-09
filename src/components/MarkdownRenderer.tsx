import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { MermaidChart } from './MermaidChart';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function isExternalHref(href?: string) {
  return typeof href === 'string' && (/^https?:\/\//.test(href) || href.startsWith('mailto:'));
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] ?? []), 'className', 'align', 'style'],
    img: [...(defaultSchema.attributes?.img ?? []), 'src', 'alt', 'width', 'height'],
    a: [...(defaultSchema.attributes?.a ?? []), 'href', 'target', 'rel'],
    div: [...(defaultSchema.attributes?.div ?? []), 'align'],
    td: [...(defaultSchema.attributes?.td ?? []), 'align'],
    th: [...(defaultSchema.attributes?.th ?? []), 'align'],
  },
};

const components: Components = {
  a: ({ href, children, ...props }) => {
    const external = isExternalHref(href);
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className ?? '');
    const lang = match?.[1];
    const codeText = String(children).replace(/\n$/, '');

    if (lang === 'mermaid') {
      return <MermaidChart code={codeText} />;
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const containerClassName = className ? `markdown-content ${className}` : 'markdown-content';

  return (
    <div className={containerClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
