"use client";
import Image from "next/image";
import { Spot } from "@/app/experience/types";

type Props = {
    spot: Spot;
};

export default function SpotDetail({ spot }: Props) {
    return (
        <div>
            <h3 style={{ marginTop: 0 }}>{spot.name}</h3>
            {spot.description && <p>{spot.description}</p>}

            {/* 画像を使うなら next/image に置き換えOK */}
            {spot.imageUrl && (
                <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 12, overflow: "hidden" }}>
                    <Image
                        src={spot.imageUrl}
                        alt={spot.name}
                        fill
                        sizes="(max-width: 480px) 90vw, 360px"
                        style={{ objectFit: "cover" }}
                    />
                </div>
            )}
        </div>
    );
}
