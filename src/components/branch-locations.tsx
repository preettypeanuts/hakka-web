"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Address {
    building?: string;
    street: string;
    district?: string;
    city: string;
    province?: string;
    postalCode: string;
    country: string;
}

interface BranchLocation {
    city: string;
    type: "Head Office" | "Operational Office" | "Warehouse";
    address: Address;
    lat: number;
    lng: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const branchLocations: BranchLocation[] = [
    {
        city: "Belawan (Medan)",
        type: "Operational Office",
        lat: 3.7868,
        lng: 98.6837,
        address: {
            street: "Complex Multatuli Indah Block E No:49",
            city: "Kota Medan",
            province: "Sumatera Utara",
            postalCode: "20151",
            country: "Indonesia",
        },
    },
    {
        city: "Batam",
        type: "Operational Office",
        lat: 1.1301,
        lng: 104.0529,
        address: {
            building: "Graha Pena Batam Lt.8 Executive Room",
            street: "Jl. Raya Batam Centre, Teluk Tering",
            city: "Batam Kota, Pulau Batam",
            postalCode: "29461",
            country: "Indonesia",
        },
    },
    {
        city: "Padang",
        type: "Operational Office",
        lat: -0.9471,
        lng: 100.4172,
        address: {
            street: "Jl. Azizi Raya Blok F No:2 Komplek Cendana Andalas",
            city: "Kota Padang",
            province: "Sumatera Barat",
            postalCode: "25126",
            country: "Indonesia",
        },
    },
    {
        city: "Jakarta",
        type: "Head Office",
        lat: -6.1218,
        lng: 106.7456,
        address: {
            building: "Rukan Golf Island Blok J No. 55-56",
            street: "Jl. The Golf Island Boulevard, Pantai Indah Kapuk",
            district: "RT. 01 / RW. 06, Kel. Kamal Muara, Kec. Penjaringan",
            city: "Jakarta Utara",
            province: "DKI Jakarta",
            postalCode: "14470",
            country: "Indonesia",
        },
    },
    {
        city: "Semarang",
        type: "Operational Office",
        lat: -6.9932,
        lng: 110.3695,
        address: {
            street: "Jl. Wali Songo No.60, Tugurejo, Kec. Tugu",
            city: "Kota Semarang",
            province: "Jawa Tengah",
            postalCode: "50185",
            country: "Indonesia",
        },
    },
    {
        city: "Surabaya",
        type: "Operational Office",
        lat: -7.2128,
        lng: 112.7341,
        address: {
            street: "Jl. Kalianget 10-12 Kav. A3, Perak Utara",
            district: "Kec. Pabean Cantikan",
            city: "Kota Surabaya",
            province: "Jawa Timur",
            postalCode: "60165",
            country: "Indonesia",
        },
    },
    {
        city: "Makassar",
        type: "Operational Office",
        lat: -5.1477,
        lng: 119.4327,
        address: {
            street: "Jl. Mesjid Raya No:68",
            district: "Kec. Bontoala",
            city: "Kota Makassar",
            province: "Sulawesi Selatan",
            postalCode: "90153",
            country: "Indonesia",
        },
    },
    {
        city: "Sulawesi Selatan",
        type: "Warehouse",
        lat: -4.9966,
        lng: 119.5715,
        address: {
            building: "Pegudangan Pattene 88",
            street: "Cluster Green Park Blok E1 No:01, Maccini Baji",
            city: "Maros",
            province: "Sulawesi Selatan",
            postalCode: "90214",
            country: "Indonesia",
        },
    },
    {
        city: "Bitung (Manado)",
        type: "Operational Office",
        lat: 1.4406,
        lng: 125.1614,
        address: {
            street: "Jl. Konsolidasi 9, Griya Maleosan Indah, Blok Emerald E/1",
            district: "Kel. Paniki Bawah, Kec. Mapanget",
            city: "Kota Manado",
            province: "Sulawesi Utara",
            postalCode: "95115",
            country: "Indonesia",
        },
    },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const typeConfig = {
    "Head Office": {
        color: "#f59e0b",
        colorLight: "#fef3c7",
        colorBorder: "#fcd34d",
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-400",
        label: "Head Office",
        size: 18,
    },
    "Operational Office": {
        color: "#0ea5e9",
        colorLight: "#e0f2fe",
        colorBorder: "#7dd3fc",
        badge: "bg-sky-50 text-sky-700 border-sky-200",
        dot: "bg-sky-500",
        label: "Operational",
        size: 13,
    },
    Warehouse: {
        color: "#10b981",
        colorLight: "#d1fae5",
        colorBorder: "#6ee7b7",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
        label: "Warehouse",
        size: 13,
    },
} as const;

// ─── Leaflet Map ──────────────────────────────────────────────────────────────

function LeafletMap({
    active,
    onSelect,
}: {
    active: BranchLocation | null;
    onSelect: (b: BranchLocation) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markersRef = useRef<Map<string, any>>(new Map());
    const activeRef = useRef<BranchLocation | null>(null);

    // Build SVG pin icon
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function buildIcon(L: any, branch: BranchLocation, isActive: boolean) {
        const cfg = typeConfig[branch.type];
        const isHead = branch.type === "Head Office";
        const s = isActive ? cfg.size * 1.4 : cfg.size;
        const outerR = s;
        const innerR = s * 0.45;

        const starPath = isHead
            ? `<polygon points="${outerR},${outerR * 0.25} ${outerR + outerR * 0.22},${outerR * 0.75} ${outerR + outerR * 0.55},${outerR * 0.75} ${outerR + outerR * 0.28},${outerR * 1.05} ${outerR + outerR * 0.38},${outerR * 1.4} ${outerR},${outerR * 1.18} ${outerR - outerR * 0.38},${outerR * 1.4} ${outerR - outerR * 0.28},${outerR * 1.05} ${outerR - outerR * 0.55},${outerR * 0.75} ${outerR - outerR * 0.22},${outerR * 0.75}" fill="white" opacity="0.9"/>`
            : "";

        const pulse = isActive
            ? `<circle cx="${outerR}" cy="${outerR}" r="${outerR + 6}" fill="${cfg.color}" opacity="0.15">
           <animate attributeName="r" values="${outerR + 4};${outerR + 12};${outerR + 4}" dur="2s" repeatCount="indefinite"/>
           <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite"/>
         </circle>`
            : "";

        const totalSize = (outerR + 14) * 2;

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}">
      ${pulse}
      <circle cx="${totalSize / 2}" cy="${totalSize / 2}" r="${outerR + 2}" fill="${cfg.colorBorder}" opacity="0.5"/>
      <circle cx="${totalSize / 2}" cy="${totalSize / 2}" r="${outerR}" fill="${cfg.color}"/>
      <circle cx="${totalSize / 2}" cy="${totalSize / 2}" r="${innerR}" fill="white" opacity="0.3"/>
      ${isHead ? `<polygon points="${Array.from({ length: 5 }, (_, i) => {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const r = outerR * 0.5;
            return `${totalSize / 2 + r * Math.cos(angle)},${totalSize / 2 + r * Math.sin(angle)}`;
        }).join(" ")}" fill="white" opacity="0.95"/>` : ""}
    </svg>`;

        return L.divIcon({
            html: svg,
            className: "",
            iconSize: [totalSize, totalSize],
            iconAnchor: [totalSize / 2, totalSize / 2],
        });
    }

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        let L: typeof import("leaflet");

        async function initMap() {
            // Dynamically import Leaflet (avoids SSR issues in Next.js)
            L = (await import("leaflet")).default;

            // Fix default icon path issue with webpack
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });

            const map = L.map(containerRef.current!, {
                center: [-2.5, 118],
                zoom: 5,
                zoomControl: false,
                attributionControl: true,
                scrollWheelZoom: true,
            });

            // Zoom control top-right
            L.control.zoom({ position: "topright" }).addTo(map);

            // CartoDB Positron — clean, minimal, elegant tile layer
            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    subdomains: "abcd",
                    maxZoom: 19,
                }
            ).addTo(map);

            mapRef.current = map;

            // Add markers
            branchLocations.forEach((branch) => {
                const isActive = activeRef.current?.city === branch.city;
                const icon = buildIcon(L, branch, isActive);

                const marker = L.marker([branch.lat, branch.lng], { icon })
                    .addTo(map)
                    .on("click", () => onSelect(branch));

                markersRef.current.set(branch.city, { marker, L });
            });
        }

        initMap();

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markersRef.current.clear();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update icons when active changes
    useEffect(() => {
        activeRef.current = active;
        markersRef.current.forEach(({ marker, L }, city) => {
            const branch = branchLocations.find((b) => b.city === city);
            if (!branch) return;
            const isActive = active?.city === city;
            marker.setIcon(buildIcon(L, branch, isActive));
        });

        // Fly to active branch
        if (active && mapRef.current) {
            mapRef.current.flyTo([active.lat, active.lng], 12, {
                duration: 1.2,
                easeLinearity: 0.25,
            });
        } else if (!active && mapRef.current) {
            mapRef.current.flyTo([-2.5, 118], 5, { duration: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
            aria-label="Peta lokasi kantor cabang"
        />
    );
}

// ─── Detail Card ──────────────────────────────────────────────────────────────

function DetailCard({
    branch,
    onClose,
}: {
    branch: BranchLocation | null;
    onClose: () => void;
}) {
    if (!branch) return null;
    const cfg = typeConfig[branch.type];

    return (
        <div
            className="
        absolute bottom-6 left-4 w-72
        bg-white/97 backdrop-blur-md
        rounded-2xl border border-slate-100
        shadow-2xl shadow-slate-300/30
        overflow-hidden
        opacity-0 animate-fade-up-in
        z-500
      "
            role="region"
            aria-label={`Detail: ${branch.city}`}
        >
            {/* Accent bar */}
            <div
                className="h-0.75 w-full"
                style={{ background: `linear-gradient(90deg, ${cfg.color} 0%, ${cfg.color}55 100%)` }}
                aria-hidden="true"
            />

            <div className="p-4 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                        <span
                            className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
                            style={{ background: cfg.colorLight }}
                            aria-hidden="true"
                        >
                            <svg viewBox="0 0 16 20" className="w-3.5 h-4" fill="none">
                                <path
                                    d="M8 0C4.686 0 2 2.686 2 6c0 5.25 6 13 6 13s6-7.75 6-13C14 2.686 11.314 0 8 0z"
                                    fill={cfg.color}
                                    fillOpacity=".18"
                                    stroke={cfg.color}
                                    strokeWidth="1.2"
                                />
                                <circle cx="8" cy="6" r="2.2" fill={cfg.color} />
                            </svg>
                        </span>
                        <div>
                            <h3 className="text-[13px] font-bold text-slate-800 leading-tight">{branch.city}</h3>
                            <span
                                className={`
                  inline-flex items-center gap-1 mt-1
                  text-[9.5px] font-bold uppercase tracking-wider
                  px-2 py-0.5 rounded-full border
                  ${cfg.badge}
                `}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} aria-hidden="true" />
                                {cfg.label}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="shrink-0 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                        aria-label="Tutup"
                    >
                        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                            <path d="M2 2l6 6M8 2L2 8" />
                        </svg>
                    </button>
                </div>

                <div className="h-px bg-slate-100" aria-hidden="true" />

                {/* Address */}
                <address className="not-italic flex flex-col gap-0.5">
                    {branch.address.building && (
                        <span className="text-[12px] font-semibold text-slate-700 leading-snug">
                            {branch.address.building}
                        </span>
                    )}
                    <span className="text-[11.5px] text-slate-500 leading-relaxed">{branch.address.street}</span>
                    {branch.address.district && branch.address.district !== "-" && (
                        <span className="text-[11px] text-slate-400 leading-relaxed">{branch.address.district}</span>
                    )}
                    <span className="text-[11px] text-slate-500">
                        {[branch.address.city, branch.address.province].filter((p) => p && p !== "-").join(", ")}
                    </span>
                    <span className="text-[10.5px] font-semibold text-slate-400 tracking-wide mt-0.5">
                        {branch.address.postalCode} · {branch.address.country}
                    </span>
                </address>
            </div>
        </div>
    );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
    active,
    onSelect,
}: {
    active: BranchLocation | null;
    onSelect: (b: BranchLocation) => void;
}) {
    const sorted = [...branchLocations].sort((a, b) => {
        if (a.type === "Head Office") return -1;
        if (b.type === "Head Office") return 1;
        return a.city.localeCompare(b.city);
    });
    const locale = useLocale();

    const lang = locale === "id" ? "id" : "en";

    const text = {
        title: {
            en: "Our Branch Locations",
            id: "Lokasi Cabang Kami",
        },
        eyebrow: {
            en: "Network Coverage",
            id: "Jaringan Kami"
        },
        sub: {
            en: "offices across Indonesia",
            id: "lokasi di Indonesia"
        }

    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-6 pb-4 border-b border-slate-100 shrink-0 opacity-0 animate-fade-up-in">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" aria-hidden="true" />
                    <span className="text-[9.5px] font-bold text-sky-500 uppercase tracking-widest">
                        {text.eyebrow[lang]}
                    </span>
                </div>
                <h2 className="text-[19px] font-extrabold text-slate-800 leading-tight tracking-tight">
                    {text.title[lang]}
                </h2>
                <p className="text-[11px] text-slate-400 mt-1">
                    {branchLocations.length} {text.sub[lang]}
                </p>
            </div>

            {/* List */}
            <ul className="flex-1 overflow-y-auto divide-y divide-slate-50" role="listbox" aria-label="Daftar cabang">
                {sorted.map((branch, i) => {
                    const cfg = typeConfig[branch.type];
                    const isActive = active?.city === branch.city;

                    return (
                        <li key={branch.city} role="option" aria-selected={isActive}>
                            <button
                                onClick={() => onSelect(branch)}
                                style={{ animationDelay: `${i * 55 + 180}ms` }}
                                className={`
                  w-full text-left px-5 py-3 flex items-center gap-3
                  transition-colors duration-150
                  opacity-0 animate-fade-up-in
                  ${isActive ? "bg-sky-50" : "hover:bg-slate-50/80"}
                `}
                            >
                                {/* Pin dot */}
                                <span
                                    className="shrink-0 rounded-full shadow-sm transition-transform duration-200"
                                    style={{
                                        width: branch.type === "Head Office" ? 12 : 9,
                                        height: branch.type === "Head Office" ? 12 : 9,
                                        background: cfg.color,
                                        boxShadow: isActive ? `0 0 0 3px ${cfg.colorBorder}` : "none",
                                    }}
                                    aria-hidden="true"
                                />

                                <div className="min-w-0 flex-1">
                                    <p className={`text-[12.5px] font-semibold leading-tight truncate ${isActive ? "text-sky-700" : "text-slate-700"}`}>
                                        {branch.city}
                                    </p>
                                    <p className="text-[10.5px] text-slate-400 truncate mt-0.5">
                                        {[branch.address.city, branch.address.province]
                                            .filter((p) => p && p !== "-")
                                            .join(", ")}
                                    </p>
                                </div>

                                <span
                                    className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide ${cfg.badge}`}
                                >
                                    {cfg.label}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Stats */}
            <div className="px-4 py-3.5 border-t border-slate-100 shrink-0 grid grid-cols-3 gap-2 opacity-0 animate-fade-up-in-400">
                {[
                    { val: "1", label: "Head Office", color: "#f59e0b" },
                    { val: "7", label: "Operational", color: "#0ea5e9" },
                    { val: "1", label: "Warehouse", color: "#10b981" },
                ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center bg-slate-50 rounded-xl py-2 gap-0.5">
                        <span className="text-[15px] font-extrabold" style={{ color: s.color }}>{s.val}</span>
                        <span className="text-[9px] text-slate-400 font-semibold text-center leading-tight">{s.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function BranchLocations() {
    const [active, setActive] = useState<BranchLocation | null>(null);

    const handleSelect = (branch: BranchLocation) => {
        setActive((prev) => (prev?.city === branch.city ? null : branch));
    };

    return (
        <>
            {/* Leaflet CSS — loaded once */}
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""
            />

            <section
                className="margin
          relative w- overflow-hidden 
          flex flex-col lg:flex-row
          rounded-3xl
          border border-slate-200/70
          shadow-2xl shadow-slate-300/20
          bg-white
        "
                style={{ height: "clamp(600px, 78vh, 780px)" }}
                aria-label="Peta Lokasi Kantor Cabang"
            >
                {/* Sidebar */}
                <aside className="lg:w-72 xl:w-80 shrink-0 flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-slate-100 order-2 lg:order-1 h-100 lg:h-auto overflow-hidden">
                    <Sidebar active={active} onSelect={handleSelect} />
                </aside>

                {/* Map */}
                <div className="relative flex-1 order-1 lg:order-2 overflow-hidden">
                    <LeafletMap active={active} onSelect={handleSelect} />
                    <DetailCard branch={active} onClose={() => setActive(null)} />
                </div>
            </section>
        </>
    );
}