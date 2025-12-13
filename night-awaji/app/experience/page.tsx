"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type LatLng = [number, number];

export default function Experience() {
    const [pos, setPos] = useState<LatLng | null>(null);

    const myIcon = L.icon({
        iconUrl: "/myIcon.png",
        iconSize: [30, 30],
        iconAnchor: [20, 40],
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((p) => {
            setPos([p.coords.latitude, p.coords.longitude]);
        });
    }, []);

    const center: LatLng = pos ?? [34.6937, 135.5023];


    return (
        <>
            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pos && <Marker position={pos} icon={myIcon} />}
            </MapContainer >
        </>
    )
}