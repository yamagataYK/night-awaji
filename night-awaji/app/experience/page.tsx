"use client";
import "leaflet/dist/leaflet.css";
import styles from "./page.module.css";
import { useMemo, useState } from "react";
import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import L from "leaflet";
import Image from "next/image";



export default function Experience() {


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
                zoom={-1}
                minZoom={-2}
                maxZoom={4}
                style={{ height: "100vh", width: "100%" }}
            >
                <ImageOverlay url="/Map.png" bounds={bounds} />




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
                </header>

            </MapContainer >
        </>
    )
}


