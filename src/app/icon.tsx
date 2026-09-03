import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Monogram favicon, generated at build time so there is no binary asset. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101211",
          color: "#c4f269",
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.05em",
        }}
      >
        mc
      </div>
    ),
    size,
  );
}
