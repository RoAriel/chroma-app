import { toHex, isDark } from "../utils/colorUtils";
import { useTheme } from "../hooks/useTheme";

export default function PaletteStrip({ colors }) {
  const { theme } = useTheme();
  const t = theme.colors;

  return (
    <div
      className="flex h-20 rounded-xl overflow-hidden border mb-6"
      style={{ borderColor: t.border }}
    >
      {colors.map((color, i) => {
        const hex = toHex(color);
        return (
          <div
            key={i}
            className="flex-1 cursor-pointer relative group"
            style={{
              backgroundColor: hex,
              transition: "flex 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.flex = "2"}
            onMouseLeave={(e) => e.currentTarget.style.flex = "1"}
            title={hex.toUpperCase()}
            onClick={() => navigator.clipboard.writeText(hex.toUpperCase()).catch(() => {})}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: isDark(color) ? "#F5F6FA" : "#1E272E" }}
              >
                {hex.toUpperCase()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
