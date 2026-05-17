export interface BranchAddress {
  building?: string;
  street: string;
  district?: string;
  city: string;
  province?: string;
  postalCode: string;
  country: string;
}

export interface BranchLocation {
  city: string;
  type: "Head Office" | "Operational Office" | "Warehouse";
  address: BranchAddress;
  lat: number;
  lng: number;
}

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
