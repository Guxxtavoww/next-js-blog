import MarkdownPreview from '@/components/markdown/markdown-preview';

interface iPostContentProps {
  content: string | undefined;
}

export default function PostContent({ content }: iPostContentProps) {
  if (!content) {
    return <h1>Fodase tá errado</h1>;
  }

  return <MarkdownPreview content={content} />;
}
