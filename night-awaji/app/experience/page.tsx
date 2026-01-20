"use client";

import "leaflet/dist/leaflet.css";
import styles from "./page.module.css";
import { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import SpotList from "@/components/SpotList";
import SpotDetail from "@/components/SpotDetail";
import { Spot, SpotType } from "./types";


type SidebarMode = "list" | "detail";


const LeafletMap = dynamic(() => import("./Leaflet"), { ssr: false });




export default function Experience() {
    const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<SidebarMode>("list");
    const [filterType, setFilterType] = useState<SpotType>("unopened");
    const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);


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
            { id: "1", lat: 34.4000, lng: 134.8000, type: "unopened", description: "未開スポット" },
            { id: "2", lat: 34.5800, lng: 135.0000, type: "released", description: "解放スポット" },
            { id: "3", lat: 34.3550, lng: 134.8400, type: "event", description: "イベントスポット" },
        ],
        []
    );

    // ヘッダー
    const openList = (t: SpotType) => {
        setFilterType(t);
        setSelectedSpot(null);
        setMode("list");
        setOpen(true);
    };

    //   詳細を開く
    const openDetail = (spot: Spot) => {
        setSelectedSpot(spot);
        setMode("detail");
        setOpen(true);
    };


    const filteredSpots = spots.filter((s) => s.type === filterType);




    return (
        <>
            <LeafletMap spots={spots} latlng={latlng} onSpotClick={openDetail} />
            <header className={styles.header}>
                <h1><a href="/">夜の淡路島</a></h1>
                <nav>
                    <ul className={styles.ul}>
                        <li><button type="button" onClick={() => openList("unopened")}>
                            <Image
                                src="/unc_pin.svg"
                                width={26}
                                height={36}
                                alt="ピンのイラスト"
                            />
                            未開スポット
                        </button></li>
                        <li><button type="button" onClick={() => openList("released")}>
                            <Image
                                src="/release_pin.svg"
                                width={32}
                                height={42}
                                alt="ピンのイラスト"
                            />
                            解放スポット
                        </button></li>
                        <li><button type="button" onClick={() => openList("event")}>
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
                side="left"
                title={mode === "list" ? "スポット一覧" : (selectedSpot?.name ?? "スポット詳細")}
            >
                {mode === "list" && (
                    <SpotList spots={filteredSpots} onSelectSpot={openDetail} />
                )}

                {mode === "detail" && selectedSpot && (
                    <SpotDetail spot={selectedSpot} />
                )}
            </Sidebar>


        </>
    )
}


