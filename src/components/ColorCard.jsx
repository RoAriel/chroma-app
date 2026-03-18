import { toHex, toRgb, toHsl, toCmyk, isDark } from "../utils/colorUtils";
import { useTheme } from "../hooks/useTheme";
import CopyButton from "./CopyButton";

export default function ColorCard({ color, index }) {
  const { theme } = useTheme();
  const t = theme.colors;

  const hex = toHex(color).toUpperCase();
  const rgb = toRgb(color);
  const hsl = toHsl(color);
  const cmyk = toCmyk(color);
  const darkSwatch = isDark(color);

  return (
    <div
      className="rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ borderColor: t.border, backgroundColor: t.surface }}
    >
      {/* Swatch */}
      <div
        className="relative h-24 w-full flex items-end justify-between p-2"
        style={{ backgroundColor: hex }}
      >
        <span
          className="text-xs font-mono font-semibold opacity-70"
          style={{ color: darkSwatch ? "#F5F6FA" : "#1E272E" }}
        >
          #{index + 1}
        </span>
        <CopyButton text={hex} />
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        {/* HEX — siempre visible */}
        <p className="font-mono font-semibold text-sm tracking-wide truncate" style={{ color: t.text }}>
          {hex}
        </p>

        {/* RGB, HSL, CMYK — ocultos en mobile, visibles en sm+ */}
        <div className="hidden sm:flex flex-col space-y-1">
          {[
            { label: "RGB", value: rgb },
            { label: "HSL", value: hsl },
            { label: "CMYK", value: cmyk },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between gap-1">
              <span className="text-xs font-mono shrink-0" style={{ color: `${t.accent}AA` }}>
                {label}
              </span>
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-xs font-mono truncate" style={{ color: `${t.text}70` }}>
                  {value}
                </span>
                <CopyButton text={value} />
              </div>
            </div>
          ))}
        </div>

        {/* En mobile mostramos botones de copia compactos */}
        <div className="flex sm:hidden gap-1 flex-wrap">
          <CopyButton text={rgb} className="flex-1 text-center" />
          <CopyButton text={hsl} className="flex-1 text-center" />
          <CopyButton text={cmyk} className="flex-1 text-center" />
        </div>
      </div>
    </div>
  );
}