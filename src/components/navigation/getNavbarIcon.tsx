import { Ship, Plane, Truck, Warehouse, Globe, Package } from "lucide-react";

export function getNavbarIcon(name: string) {
    const n = name.toLowerCase();
    if (n.includes("sea"))       return <Ship size={20} />;
    if (n.includes("air"))       return <Plane size={20} />;
    if (n.includes("truck"))     return <Truck size={20} />;
    if (n.includes("warehouse")) return <Warehouse size={20} />;
    if (n.includes("export") || n.includes("import")) return <Globe size={20} />;
    return <Package size={20} />;
}
