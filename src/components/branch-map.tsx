"use client";

import { branchLocations, type BranchLocation } from "@/components/branch-locations-data";
import { useEffect, useRef } from "react";
import type * as Leaflet from "leaflet";

const typeConfig = {
  "Head Office": { color: "#f59e0b", colorBorder: "#fcd34d", size: 18 },
  "Operational Office": { color: "#0ea5e9", colorBorder: "#7dd3fc", size: 13 },
  Warehouse: { color: "#10b981", colorBorder: "#6ee7b7", size: 13 },
} as const;

function buildIcon(
  L: typeof Leaflet,
  branch: BranchLocation,
  isActive: boolean,
) {
  const cfg = typeConfig[branch.type];
  const isHead = branch.type === "Head Office";
  const s = isActive ? cfg.size * 1.4 : cfg.size;
  const outerR = s;
  const innerR = s * 0.45;
  const totalSize = (outerR + 14) * 2;

  const pulse = isActive
    ? `<circle cx="${outerR}" cy="${outerR}" r="${outerR + 6}" fill="${cfg.color}" opacity="0.15">
         <animate attributeName="r" values="${outerR + 4};${outerR + 12};${outerR + 4}" dur="2s" repeatCount="indefinite"/>
         <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite"/>
       </circle>`
    : "";

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

export function BranchMap({
  active,
  onSelect,
}: {
  active: BranchLocation | null;
  onSelect: (b: BranchLocation) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const markersRef = useRef<
    Map<string, { marker: Leaflet.Marker; L: typeof Leaflet }>
  >(new Map());
  const activeRef = useRef<BranchLocation | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    async function initMap() {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current, {
        center: [-2.5, 118],
        zoom: 5,
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: true,
      });

      L.control.zoom({ position: "topright" }).addTo(map);
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      mapRef.current = map;

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
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
  }, [onSelect]);

  useEffect(() => {
    activeRef.current = active;
    markersRef.current.forEach(({ marker, L }, city) => {
      const branch = branchLocations.find((b) => b.city === city);
      if (!branch) return;
      marker.setIcon(buildIcon(L, branch, active?.city === city));
    });

    if (active && mapRef.current) {
      mapRef.current.flyTo([active.lat, active.lng], 12, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    } else if (!active && mapRef.current) {
      mapRef.current.flyTo([-2.5, 118], 5, { duration: 1 });
    }
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-label="Branch office map"
    />
  );
}
