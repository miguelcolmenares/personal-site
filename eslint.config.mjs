import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/*
 * eslint-config-next 16 ships native flat configs, so these are spread
 * directly. Routing them through FlatCompat — the pattern older Next
 * templates still use — makes the eslintrc shim throw on a circular
 * structure before it reports a single lint result.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];

export default eslintConfig;
