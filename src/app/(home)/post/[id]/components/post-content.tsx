import MarkdownPreview from '@/components/markdown/markdown-preview';

interface iPostContentProps {
  content: string;
}

export default function PostContent({ content }: iPostContentProps) {
  return <MarkdownPreview content={content} />;
}
