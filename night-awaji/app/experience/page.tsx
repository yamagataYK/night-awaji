"use client";

import "leaflet/dist/leaflet.css";
import styles from "./page.module.css";
import { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";


type Spot = {
    id: string;
    name: string;
    lat: number;
    lng: number;
};

type DrawerType = "unopened" | "released" | "event" | null;


const LeafletMap = dynamic(() => import("./Leaflet"), { ssr: false });

export default function Experience() {
    const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);

    const [open, setOpen] = useState(false);
    const [type, setType] = useState<DrawerType>(null);

    useEffect(() => {

        const id = navigator.geolocation.watchPosition(
            (p) => {
                setLatlng({ lat: p.coords.latitude, lng: p.coords.longitude });

            }
        );

        return () => navigator.geolocation.clearWatch(id);
    }, []);


    const spots: Spot[] = useMemo(
        () => [
            { id: "1", name: "スポットA", lat: 34.4000, lng: 134.8000 },
            { id: "2", name: "スポットB", lat: 34.5800, lng: 135.0000 },
            { id: "3", name: "スポットc", lat: 34.3550, lng: 134.8400 },
        ],
        []
    );

    const openSidebar = (t: Exclude<DrawerType, null>) => {
        setType(t);
        setOpen(true);
    };



    return (
        <>
            <LeafletMap spots={spots} latlng={latlng} />
            <header className={styles.header}>
                <h1><a href="/">夜の淡路島</a></h1>
                <nav>
                    <ul className={styles.ul}>
                        <li><button type="button" onClick={() => openSidebar("unopened")}>
                            <Image
                                src="/unc_pin.svg"
                                width={26}
                                height={36}
                                alt="ピンのイラスト"
                            />
                            未開スポット
                        </button></li>
                        <li><button type="button" onClick={() => openSidebar("released")}>
                            <Image
                                src="/release_pin.svg"
                                width={32}
                                height={42}
                                alt="ピンのイラスト"
                            />
                            解放スポット
                        </button></li>
                        <li><button type="button" onClick={() => openSidebar("event")}>
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

            <Sidebar
                open={open}
                onClose={() => setOpen(false)}
                title={type === "unopened" ? "未開スポット" : type === "released" ? "解放スポット" : "イベントスポット"}
                side="left"
            >

            </Sidebar>


        </>
    )
}


