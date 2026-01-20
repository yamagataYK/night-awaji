"use client";
import { Spot } from "@/app/experience/types";

type Props = {
    spots: Spot[];
    onSelectSpot: (spot: Spot) => void;
};

export default function SpotList({ spots, onSelectSpot }: Props) {
    return (
        <div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {spots.map((s) => (
                    <li key={s.id} style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
                        <button
                            type="button"
                            onClick={() => onSelectSpot(s)}
                            style={{
                                width: "100%",
                                textAlign: "left",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            {s.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
