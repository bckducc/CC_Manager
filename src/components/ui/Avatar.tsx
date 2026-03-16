import { AVATAR_COLORS } from "../../constants";

interface AvatarProps {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 32 }: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 600,
        flexShrink: 0,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {initials}
    </div>
  );
}
