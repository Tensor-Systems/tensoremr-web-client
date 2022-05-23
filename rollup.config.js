import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import css from "rollup-plugin-import-css";
import svgr from '@svgr/rollup';
import image from '@rollup/plugin-image';

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.tsx",
        output: [
            {
                dir: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                dir: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(),
            css(),
            svgr(),
            image(),
        ],
        external: ["react", "react-dom"]
    },
];
