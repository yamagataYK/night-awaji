"use client";
import "leaflet/dist/leaflet.css";
import styles from "./page.module.css";
import { useMemo, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from "leaflet";
import Image from "next/image";


type Spot = {
    id: string;
    name: string;
    lat: number;
    lng: number;
};


export default function Experience() {
    const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [geoError, setGeoError] = useState<string | null>(null);

    useEffect(() => {


        const id = navigator.geolocation.watchPosition(
            (p) => {
                setGeoError(null);
                setLatlng({ lat: p.coords.latitude, lng: p.coords.longitude });
                setAccuracy(p.coords.accuracy ?? null);
            },
            (err) => {
                setGeoError(err.message);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 3000,
                timeout: 10000,
            }
        );

        return () => navigator.geolocation.clearWatch(id);
    }, []);

    //スポット　DBから取得に置き換え
    const spots: Spot[] = useMemo(
        () => [
            { id: "1", name: "スポットA", lat: 34.4000, lng: 134.8000 },
            { id: "2", name: "スポットB", lat: 34.5800, lng: 135.0000 },
            { id: "3", name: "スポットc", lat: 34.3550, lng: 134.8400 },
        ],
        []
    );
    //  ピンアイコン
    const uncIcon = useMemo(
        () =>
            L.icon({
                iconUrl: "/unc_pin.svg",
                iconSize: [32, 42],
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
        <>
            <header className={styles.header}>
                <h1><a href="/">夜の淡路島</a></h1>
                <nav>
                    <ul className={styles.ul}>
                        <li><button type="button">
                            <Image
                                src="/unc_pin.svg"
                                width={26}
                                height={36}
                                alt="ピンのイラスト"
                            />
                            未開スポット
                        </button></li>
                        <li><button type="button">
                            <Image
                                src="/release_pin.svg"
                                width={32}
                                height={42}
                                alt="ピンのイラスト"
                            />
                            解放スポット
                        </button></li>
                        <li><button type="button">
                            <Image
                                src="/event_pin.svg"
                                width={32}
                                height={42}
                                alt="ピンのイラスト"
                            />
                            イベントスポット
                        </button></li>
                    </ul>
                </nav>
            </header >
            <MapContainer
                center={[spots[0].lat, spots[0].lng]}
                zoom={11}
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* スポット */}
                {spots.map((s) => (
                    <Marker key={s.id} position={[s.lat, s.lng]} icon={uncIcon} />
                ))}

                {/* ✅ 現在地（位置取れたら表示） */}
                {latlng && <Marker position={[latlng.lat, latlng.lng]} icon={myIcon} />}









            </MapContainer>

            <div className={styles.geoBox}>
                <div>
                    現在地：
                    {latlng ? `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}` : "取得中..."}
                </div>
                <div>精度：{accuracy !== null ? `${Math.round(accuracy)}m` : "-"}</div>
                {geoError && <div>⚠️ {geoError}</div>}
            </div>
        </>
    )
}

