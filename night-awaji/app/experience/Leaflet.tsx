"use client";

import { useMemo } from "react";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from "leaflet";
import { Spot, SpotType } from "./types";


type Props = {
    spots: Spot[];
    latlng: { lat: number; lng: number } | null;
    onSpotClick: (spot: Spot) => void;
};

export default function LeafletMap({ spots, latlng, onSpotClick }: Props) {
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

    const releasedIcon = useMemo(
        () =>
            L.icon({
                iconUrl: "/release_pin.svg",
                iconSize: [35, 45],
                iconAnchor: [13, 36],
            }),
        []
    );

    const eventIcon = useMemo(
        () =>
            L.icon({
                iconUrl: "/event_pin.svg",
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


    const iconByType = (type: SpotType) => {
        if (type === "unopened") return uncIcon;
        if (type === "released") return releasedIcon;
        return eventIcon;
    };

    const center: [number, number] =
        latlng ? [latlng.lat, latlng.lng] : [spots[0].lat, spots[0].lng];

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
                <Marker
                    key={s.id}
                    position={[s.lat, s.lng]}
                    icon={iconByType(s.type)}
                    eventHandlers={{
                        click: () => onSpotClick(s),
                    }}
                />
            ))}

            {latlng && <Marker position={[latlng.lat, latlng.lng]} icon={myIcon} />}
        </MapContainer>
    );
}