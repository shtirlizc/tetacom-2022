// @ts-check

/**
 * @typedef {{
 *   type: string;
 *   tagName?: string;
 *   value?: string;
 *   properties?: Record<string, unknown>;
 *   children?: HastNode[];
 * }} HastNode
 */

/** @param {unknown} value */
const getStringProperty = (value) => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.join(" ").trim();
  }

  return "";
};

/** @param {HastNode} node */
const isWhitespaceText = (node) =>
  node.type === "text" && node.value?.trim() === "";

/** @param {HastNode} node */
const isStandaloneImageParagraph = (node) => {
  if (node.type !== "element" || node.tagName !== "p") {
    return false;
  }

  const contentChildren = (node.children ?? []).filter(
    (child) => !isWhitespaceText(child),
  );

  return (
    contentChildren.length === 1 &&
    contentChildren[0].type === "element" &&
    contentChildren[0].tagName === "img"
  );
};

/**
 * @param {HastNode} paragraph
 * @returns {HastNode}
 */
const createImageFigure = (paragraph) => {
  const image = paragraph.children?.find(
    (child) => child.type === "element" && child.tagName === "img",
  );
  if (!image) {
    return paragraph;
  }

  const caption =
    getStringProperty(image.properties?.title) ||
    getStringProperty(image.properties?.alt);
  /** @type {HastNode[]} */
  const children = [image];

  if (caption) {
    children.push({
      type: "element",
      tagName: "figcaption",
      properties: {},
      children: [{ type: "text", value: caption }],
    });
  }

  return {
    type: "element",
    tagName: "figure",
    properties: {},
    children,
  };
};

export function rehypeImageFigures() {
  /** @param {HastNode} tree */
  return (tree) => {
    /** @param {HastNode} node */
    const visitChildren = (node) => {
      if (!Array.isArray(node.children)) {
        return;
      }

      node.children = node.children.map((child) => {
        if (isStandaloneImageParagraph(child)) {
          return createImageFigure(child);
        }

        visitChildren(child);
        return child;
      });
    };

    visitChildren(tree);
  };
}
