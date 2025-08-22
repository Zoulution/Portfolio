import React from "react";

const isLikelyUrl = (str: string) => /^https?:\/\/[^\s]+$/i.test(str.trim());
const LIST_RE = /\{list\}([\s\S]*?)\{\/list\}/gi;

// Build a privacy-friendly, minimal-chrome YouTube embed URL
const toYouTubeEmbed = (url: string, showControls = false) => {
  try {
    const u = new URL(url);
    let id = "";

    if (u.hostname.includes("youtube.com")) id = u.searchParams.get("v") ?? "";
    else if (u.hostname === "youtu.be") id = u.pathname.slice(1);

    if (!id) return null;

    const params = new URLSearchParams({
      modestbranding: "1",
      rel: "0",
      iv_load_policy: "3",
      playsinline: "1",
      controls: showControls ? "1" : "0",
      // fs: "0",            // uncomment to hide fullscreen button
      // cc_load_policy: "0" // captions off by default
    });

    return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
  } catch {
    return null;
  }
};

// {img:src|alt=...|caption=...|width=...}
// {video:src|alt=...|caption=...|width=...}
// {list}line1\nline2\n...{/list}
const MEDIA_RE =
  /\{(img|video):([^|}]+)(?:\|alt=([^|}]*))?(?:\|caption=([^|}]*))?(?:\|width=(\d+))?\}/gi;

function renderContent(content: string) {
  const out: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  const pushTextWithLinks = (text: string) => {
    const parts = text.split(/(\s+)/);
    parts.forEach((part) => {
      if (!part) return;
      if (isLikelyUrl(part)) {
        out.push(
          <a key={key++} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else {
        out.push(<React.Fragment key={key++}>{part}</React.Fragment>);
      }
    });
  };

  // Walk through the string, always rendering the NEXT thing (media or list)
  while (lastIndex < content.length) {
    MEDIA_RE.lastIndex = lastIndex;
    LIST_RE.lastIndex = lastIndex;

    const mediaMatch = MEDIA_RE.exec(content);
    const listMatch = LIST_RE.exec(content);

    let nextType: "media" | "list" | null = null;
    let nextMatch: RegExpExecArray | null = null;

    if (mediaMatch && listMatch) {
      if (mediaMatch.index < listMatch.index) {
        nextType = "media";
        nextMatch = mediaMatch;
      } else {
        nextType = "list";
        nextMatch = listMatch;
      }
    } else if (mediaMatch) {
      nextType = "media";
      nextMatch = mediaMatch;
    } else if (listMatch) {
      nextType = "list";
      nextMatch = listMatch;
    } else {
      pushTextWithLinks(content.slice(lastIndex));
      break;
    }

    // text before the next shortcode block
    if (nextMatch.index > lastIndex) {
      pushTextWithLinks(content.slice(lastIndex, nextMatch.index));
    }

    if (nextType === "media") {
      const [full, kind, rawSrc, alt = "", caption = "", widthStr] = nextMatch!;
      const width = widthStr ? Number(widthStr) : undefined;
      const kindLower = kind.toLowerCase();
      const label = (alt || caption || "Video").trim();
      const figcapId = caption ? `video-cap-${key}` : undefined;

      if (kindLower === "img") {
        out.push(
          <figure key={key++} className="media-figure">
            <img
              className="media-embed"
              src={rawSrc}
              alt={(alt || caption || "Image").trim()}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: width ? `${width}px` : "900px",
              }}
            />
            {caption && (
              <figcaption className="media-caption">
                Figure: {caption}
              </figcaption>
            )}
          </figure>
        );
      } else {
        const ytEmbed = toYouTubeEmbed(rawSrc, /* showControls */ false);
        out.push(
          <figure key={key++} className="media-figure">
            {ytEmbed ? (
              <iframe
                className="media-embed"
                src={ytEmbed}
                title={label}
                aria-label={label}
                aria-describedby={figcapId}
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  border: 0,
                  maxWidth: width ? `${width}px` : "900px",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                controls
                className="media-embed"
                aria-label={label}
                title={label}
                aria-describedby={figcapId}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: width ? `${width}px` : "900px",
                }}
              >
                <source src={rawSrc} />
                Your browser does not support the video tag.
              </video>
            )}
            {caption && (
              <figcaption id={figcapId} className="media-caption">
                Video: {caption}
              </figcaption>
            )}
          </figure>
        );
      }

      lastIndex = nextMatch.index + full.length;
    } else {
      // LIST: {list} line1\nline2\n... {/list}
      const [full, body] = nextMatch!;
      const items = body
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);

      out.push(
        <div key={key++} className="list-block-parent">
          <div
            key={key++}
            className="list-block"
            style={{ maxWidth: "fit-content" }}
          >
            {items.map((item, i) => (
              <div key={i}>{renderContent(item)}</div>
            ))}
          </div>
        </div>
      );

      lastIndex = nextMatch.index + full.length;
    }
  }

  return out;
}

export default renderContent;
