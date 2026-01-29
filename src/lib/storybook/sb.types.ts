import type { DecoratorFunction } from "storybook/internal/csf";

type TypedMetaOptions = Partial<{
  parameters: Partial<{
    layout: "centered" | "fullscreen" | "padded";
  }>;

  tags: Array<"autodocs" | "!autodocs">;
}>;

type TypedGlobalPreview = Partial<{
  parameters: Partial<{
    options: Partial<{
      storySort: Partial<{
        order: Array<unknown>;
      }>;
    }>;

    controls: Partial<{ matchers: Record<string, unknown> }>;

    viewport: Partial<{ options: Viewports }>;

    layout: "fullscreen" | "centered" | "padded";
  }>;

  decorators: Array<DecoratorFunction>;
}>;

type Viewports = Record<
  string,
  {
    name: string;
    styles: { width?: `${number}px`; height?: `${number}px` };
    type?: "desktop" | "mobile" | "tablet" | "other";
  }
>;

export type { TypedGlobalPreview, TypedMetaOptions, Viewports };
