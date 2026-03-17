import { useTheme } from "../hooks/useTheme";

export default function SkeletonCard() {
    const { theme } = useTheme();
    const t = theme.colors;

    return (
        <div
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: t.border, backgroundColor: t.surface }}
        >
            <div className="h-24 w-full relative overflow-hidden" style={{ backgroundColor: t.border }}>
                <div className="absolute inset-0 skeleton-shimmer" />
            </div>
            <div className="p-3 space-y-3">
                <div className="h-4 w-24 rounded relative overflow-hidden" style={{ backgroundColor: t.border }}>
                    <div className="absolute inset-0 skeleton-shimmer" />
                </div>
                <div className="h-3 w-32 rounded relative overflow-hidden" style={{ backgroundColor: t.border }}>
                    <div className="absolute inset-0 skeleton-shimmer" />
                </div>
                <div className="h-3 w-28 rounded relative overflow-hidden" style={{ backgroundColor: t.border }}>
                    <div className="absolute inset-0 skeleton-shimmer" />
                </div>
            </div>
        </div>
    );
}