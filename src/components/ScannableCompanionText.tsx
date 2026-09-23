import React from 'react';
import { Sparkles } from 'lucide-react';

interface ScannableCompanionTextProps {
  text: string;
  primaryColor?: string;
  isStreaming?: boolean;
  isScannable?: boolean;
}

/**
 * Parses inline markdown tokens: **bold**, *italic*, and `code`
 */
function parseInlineMarkdown(rawText: string): React.ReactNode {
  if (!rawText) return null;

  // Split by code, bold, and italic regex tokens
  const tokens = rawText.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return tokens.map((token, idx) => {
    if (!token) return null;

    if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
      return (
        <code
          key={idx}
          className="font-mono text-xs bg-stone-100 px-1.5 py-0.5 rounded text-purple-900 border border-stone-200"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return (
        <strong key={idx} className="font-bold text-stone-950">
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (token.startsWith('*') && token.endsWith('*') && token.length > 2) {
      return (
        <em key={idx} className="italic text-stone-700">
          {token.slice(1, -1)}
        </em>
      );
    }

    return <React.Fragment key={idx}>{token}</React.Fragment>;
  });
}

type ParsedBlock =
  | { type: 'header'; level: number; text: string }
  | { type: 'bullet-list'; items: Array<{ boldKey?: string; text: string }> }
  | { type: 'numbered-list'; items: Array<{ num: string; boldKey?: string; text: string }> }
  | { type: 'paragraph'; text: string };

/**
 * Parses structured markdown text into discrete scannable visual blocks.
 * Automatically recognizes headers, bullet lists with bold keys, numbered milestones, and paragraphs.
 */
function parseTextToBlocks(rawText: string): ParsedBlock[] {
  const lines = rawText.split('\n');
  const blocks: ParsedBlock[] = [];

  let currentBulletList: Array<{ boldKey?: string; text: string }> = [];
  let currentNumberedList: Array<{ num: string; boldKey?: string; text: string }> = [];
  let currentParagraphLines: string[] = [];

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      const pText = currentParagraphLines.join(' ').trim();
      if (pText) {
        blocks.push({ type: 'paragraph', text: pText });
      }
      currentParagraphLines = [];
    }
  };

  const flushBullets = () => {
    if (currentBulletList.length > 0) {
      blocks.push({ type: 'bullet-list', items: [...currentBulletList] });
      currentBulletList = [];
    }
  };

  const flushNumbers = () => {
    if (currentNumberedList.length > 0) {
      blocks.push({ type: 'numbered-list', items: [...currentNumberedList] });
      currentNumberedList = [];
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushBullets();
    flushNumbers();
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Blank line indicates block break
    if (!trimmed) {
      flushAll();
      continue;
    }

    // Header check: #, ##, ###, ####
    const headerMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headerMatch) {
      flushAll();
      blocks.push({
        type: 'header',
        level: headerMatch[1].length,
        text: headerMatch[2].trim()
      });
      continue;
    }

    // Bullet item check: *, -, •
    const bulletMatch = trimmed.match(/^[\*\-•]\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      flushNumbers();

      const itemContent = bulletMatch[1].trim();
      // Check if bullet begins with a bold key: **Key**: text or **Key** - text
      const boldKeyMatch = itemContent.match(/^\*\*([^*]+)\*\*(?::|-)?\s*(.*)$/);

      if (boldKeyMatch) {
        currentBulletList.push({
          boldKey: boldKeyMatch[1].trim(),
          text: boldKeyMatch[2].trim()
        });
      } else {
        currentBulletList.push({
          text: itemContent
        });
      }
      continue;
    }

    // Numbered item check: 1., 2., etc.
    const numberMatch = trimmed.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numberMatch) {
      flushParagraph();
      flushBullets();

      const num = numberMatch[1];
      const itemContent = numberMatch[2].trim();
      const boldKeyMatch = itemContent.match(/^\*\*([^*]+)\*\*(?::|-)?\s*(.*)$/);

      if (boldKeyMatch) {
        currentNumberedList.push({
          num,
          boldKey: boldKeyMatch[1].trim(),
          text: boldKeyMatch[2].trim()
        });
      } else {
        currentNumberedList.push({
          num,
          text: itemContent
        });
      }
      continue;
    }

    // Otherwise, regular paragraph line
    flushBullets();
    flushNumbers();
    currentParagraphLines.push(trimmed);
  }

  flushAll();
  return blocks;
}

export const ScannableCompanionText: React.FC<ScannableCompanionTextProps> = ({
  text,
  primaryColor = '#7A578E',
  isStreaming = false
}) => {
  if (!text) return null;

  const blocks = parseTextToBlocks(text);

  return (
    <div className="space-y-3 font-companion-speech text-[15px] sm:text-base leading-relaxed text-stone-800">
      {blocks.map((block, bIdx) => {
        const isLastBlock = bIdx === blocks.length - 1;

        if (block.type === 'header') {
          return (
            <div key={bIdx} className="pt-2 pb-1 first:pt-0">
              <h4
                className="font-sans font-bold text-stone-950 tracking-tight text-[15px] sm:text-base flex items-center gap-2 border-l-3 pl-3 py-1 rounded-r-md"
                style={{
                  borderColor: primaryColor,
                  backgroundColor: `${primaryColor}0d`
                }}
              >
                <Sparkles
                  className="w-3.5 h-3.5 shrink-0 opacity-75"
                  style={{ color: primaryColor }}
                />
                <span>{parseInlineMarkdown(block.text)}</span>
              </h4>
            </div>
          );
        }

        if (block.type === 'bullet-list') {
          return (
            <ul key={bIdx} className="my-2 space-y-2.5 pl-0.5">
              {block.items.map((item, iIdx) => {
                const isVeryLastItem = isLastBlock && iIdx === block.items.length - 1;
                return (
                  <li
                    key={iIdx}
                    className="flex items-start gap-2.5 text-stone-800 text-[14.5px] sm:text-[15px] leading-relaxed group"
                  >
                    {/* Visual Bullet Anchor with Companion Theme Color */}
                    <span
                      className="w-2 h-2 rounded-full mt-2 shrink-0 transition-transform group-hover:scale-125 shadow-2xs"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div className="flex-1">
                      {item.boldKey ? (
                        <>
                          <span
                            className="font-bold text-stone-950 bg-stone-100/90 border border-stone-200/80 px-1.5 py-0.5 rounded text-[13.5px] mr-1.5 inline-block shadow-2xs"
                          >
                            {item.boldKey}:
                          </span>
                          <span>{parseInlineMarkdown(item.text)}</span>
                        </>
                      ) : (
                        <span>{parseInlineMarkdown(item.text)}</span>
                      )}
                      {isVeryLastItem && isStreaming && (
                        <span
                          className="inline-block w-2 h-4 ml-1.5 align-middle animate-pulse rounded-xs"
                          style={{ backgroundColor: primaryColor }}
                          title="Generating stream..."
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }

        if (block.type === 'numbered-list') {
          return (
            <ol key={bIdx} className="my-2.5 space-y-2.5 pl-0.5">
              {block.items.map((item, iIdx) => {
                const isVeryLastItem = isLastBlock && iIdx === block.items.length - 1;
                return (
                  <li
                    key={iIdx}
                    className="flex items-start gap-2.5 text-stone-800 text-[14.5px] sm:text-[15px] leading-relaxed group"
                  >
                    {/* Milestone Number Badge */}
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold text-white shrink-0 mt-0.5 shadow-2xs font-sans"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {item.num}
                    </span>
                    <div className="flex-1">
                      {item.boldKey ? (
                        <>
                          <span
                            className="font-bold text-stone-950 bg-stone-100/90 border border-stone-200/80 px-1.5 py-0.5 rounded text-[13.5px] mr-1.5 inline-block shadow-2xs"
                          >
                            {item.boldKey}:
                          </span>
                          <span>{parseInlineMarkdown(item.text)}</span>
                        </>
                      ) : (
                        <span>{parseInlineMarkdown(item.text)}</span>
                      )}
                      {isVeryLastItem && isStreaming && (
                        <span
                          className="inline-block w-2 h-4 ml-1.5 align-middle animate-pulse rounded-xs"
                          style={{ backgroundColor: primaryColor }}
                          title="Generating stream..."
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          );
        }

        // Paragraph Block
        return (
          <p key={bIdx} className="text-[14.5px] sm:text-[15px] leading-relaxed text-stone-800">
            {parseInlineMarkdown(block.text)}
            {isLastBlock && isStreaming && (
              <span
                className="inline-block w-2 h-4 ml-1.5 align-middle animate-pulse rounded-xs"
                style={{ backgroundColor: primaryColor }}
                title="Generating stream..."
              />
            )}
          </p>
        );
      })}
    </div>
  );
};
