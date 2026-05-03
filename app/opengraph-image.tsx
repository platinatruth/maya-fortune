import { ImageResponse } from "next/og";

export const alt = "maya-fortune — Maya Tzolkin reading from your birthday";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #faf7f2 0%, #f3ede1 50%, #d6efeb 100%)",
          padding: "100px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#1f8e82",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "80px",
              height: "2px",
              background: "#2fb3a4",
            }}
          />
          <span
            style={{
              fontSize: "26px",
              letterSpacing: "0.35em",
              fontWeight: 600,
            }}
          >
            MAYA-FORTUNE
          </span>
          <div
            style={{
              display: "flex",
              width: "80px",
              height: "2px",
              background: "#2fb3a4",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "92px",
            color: "#2a2a28",
            fontWeight: 700,
            marginTop: "44px",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          Maya Tzolkin Reading
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "30px",
            color: "#5a5752",
            marginTop: "28px",
            textAlign: "center",
            maxWidth: "880px",
            lineHeight: 1.5,
          }}
        >
          Discover your KIN, life rhythm &amp; destined connections from your
          birthday.
        </div>

        <div
          style={{
            display: "flex",
            gap: "28px",
            marginTop: "70px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#c0524a",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#e9e4d6",
              border: "2px solid #c8c2b0",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#3d7ea6",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#d8b14a",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
