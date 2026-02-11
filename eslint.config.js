//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";

export default [
  ...tanstackConfig,
  {
    files: [
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.js",
      "./src/**/*.jsx",
    ],
    rules: {
      "import/order": "off",
      "no-shadow": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*", "./*", ".", ".."],
              message:
                "\nUse `@/{filepath}` for consistency when importing modules.",
            },
          ],
        },
      ],
    },
  },
];
