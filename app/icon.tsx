import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

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
          background: "#051A24",
          color: "#FFFFFF",
          fontSize: 340,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.04em",
        }}
      >
        S
      </div>
    ),
    size,
  );
}
