"use client";

import { useMemo } from "react";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from "leaflet";

type Spot = {
    id: string;
    name: string;
    lat: number;
    lng: number;
};

type Props = {
    spots: Spot[];
    latlng: { lat: number; lng: number } | null;
};

export default function LeafletMap({ spots, latlng }: Props) {
    //  ピンアイコン
    const uncIcon = useMemo(
        () =>
            L.icon({
                iconUrl: "/unc_pin.svg",
                iconSize: [35, 45],
                iconAnchor: [13, 36],
            }),
        []
    );

    //  現在地アイコン
    const myIcon = useMemo(
        () =>
            L.icon({
                iconUrl: "/myIcon.png",
                iconSize: [25, 25],
                iconAnchor: [15, 30],
            }),
        []
    );

    return (
        <MapContainer
            center={[spots[0].lat, spots[0].lng]}
            zoom={11}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {spots.map((s) => (
                <Marker key={s.id} position={[s.lat, s.lng]} icon={uncIcon} />
            ))}

            {latlng && <Marker position={[latlng.lat, latlng.lng]} icon={myIcon} />}
        </MapContainer>
    );
}