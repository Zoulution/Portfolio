import React from "react";

const isLikelyUrl = (str: string) => /^https?:\/\/[^\s]+$/i.test(str.trim());

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
// {video:src|caption=...|width=...}
const MEDIA_RE =
  /\{(img|video):([^|}]+)(?:\|alt=([^|}]*))?(?:\|caption=([^|}]*))?(?:\|width=(\d+))?\}/gi;

function renderContent(content: string) {
  const out: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
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

  while ((match = MEDIA_RE.exec(content)) !== null) {
    const [full, kind, rawSrc, alt = "", caption = "", widthStr] = match;

    // text before this shortcode
    if (match.index > lastIndex) {
      pushTextWithLinks(content.slice(lastIndex, match.index));
    }

    const width = widthStr ? Number(widthStr) : undefined;
    const kindLower = kind.toLowerCase();

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
            <figcaption className="media-caption">Figure: {caption}</figcaption>
          )}
        </figure>
      );
    } else if (kindLower === "video") {
      const ytEmbed = toYouTubeEmbed(rawSrc, /* showControls */ false);

      out.push(
        <figure key={key++} className="media-figure">
          {ytEmbed ? (
            <iframe
              className="media-embed"
              src={ytEmbed}
              title={(alt || caption || "Video").trim()}
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
            <figcaption className="media-caption">Video: {caption}</figcaption>
          )}
        </figure>
      );
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < content.length) {
    pushTextWithLinks(content.slice(lastIndex));
  }

  return out;
}

export default renderContent;
