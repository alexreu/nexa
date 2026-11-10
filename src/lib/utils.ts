import { createCn } from "cn/config";

/**
 * `cn` resolves conflicts between Tailwind classes, so it must know the
 * project's own tokens: without this, `text-h3` reads as a colour and
 * `cn("text-h3", "text-subtle")` silently drops the font size.
 */
export const cn = createCn({
  extend: {
    theme: {
      text: [
        "display",
        "h2",
        "h3",
        "lead",
        "label",
        "small",
        "caption",
        "body-sm",
        "body-lg",
      ],
      shadow: ["subtle", "card", "lifted", "overlay", "glow"],
      ease: ["out-soft", "in-out-soft"],
    },
  },
});
