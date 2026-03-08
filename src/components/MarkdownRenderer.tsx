import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function isExternalHref(href?: string) {
  return typeof href === 'string' && (/^https?:\/\//.test(href) || href.startsWith('mailto:'));
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const containerClassName = className ? `markdown-content ${className}` : 'markdown-content';

  return (
    <div className={containerClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
