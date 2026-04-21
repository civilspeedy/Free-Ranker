// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.strict,
    {
        plugins: {
            "jsx-a11y": jsxA11y,
            import: importPlugin,
            "unused-imports": unusedImports,
        },
        rules: {
            "unused-imports/no-unused-imports": "warn",
            "unused-imports/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],
            "jsx-a11y/anchor-is-valid": "warn",
        },
    },
);
