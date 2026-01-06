"use client";
import "leaflet/dist/leaflet.css";
import styles from "./page.module.css";
import { useMemo, useState } from "react";
import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import L from "leaflet";

type XY = [number, number]; // CRS.Simple 用（画像上の座標）

export default function Experience() {

    const bounds: [XY, XY] = useMemo(() => [[0, 0], [1100, 1100]], []);


    const center: XY = useMemo(() => [500, 500], []);

    // 画像の任意位置自分の座標
    const [pos] = useState<XY>([520, 430]);

    const myIcon = useMemo(
        () =>
            L.icon({
                iconUrl: "/myIcon.png",
                iconSize: [30, 30],
                iconAnchor: [15, 30],
            }),
        []
    );


    return (
        <>
            <MapContainer
                crs={L.CRS.Simple}
                center={center}
                zoom={0}
                minZoom={-2}
                maxZoom={4}
                style={{ height: "100vh", width: "100%" }}
            >
                <ImageOverlay url="/Map.png" bounds={bounds} />
                {/* 画像上の座標でマーカー */}
                <Marker position={pos} icon={myIcon} />



                <header className={styles.header}>
                    <h1><a href="/">夜の淡路島</a></h1>
                    <nav>
                        <ul className={styles.ul}>
                            <li><button type="button">未開スポット</button></li>
                            <li><button type="button">解放スポット</button></li>
                            <li><button type="button">イベントスポット</button></li>
                        </ul>
                    </nav>
                </header>

            </MapContainer >
        </>
    )
}