import React from "react";

export default function MenuButton({ label, onClick, className, titleClass }) {
    return (
        <button className={className} onClick={onClick}>
            <div className={titleClass}>
                <p>{label}</p>
            </div>
        </button>
    );
}
