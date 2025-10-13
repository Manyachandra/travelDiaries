import React from 'react'
import styles from './Index.module.css'
import { useContext, useState } from "react";
import { Context } from "../../../../context/Context";
function Details({img,title}) {
    const { user } = useContext(Context);
    const imageSrc = (() => {
        if (!img) return "/road.jpg";
        const value = String(img);
        const isAbsolute = /^https?:\/\//i.test(value) || /^data:|^blob:/i.test(value);
        if (isAbsolute) return value;
        if (value.startsWith("/images/")) return value;
        return `/images/${value.replace(/^\/+/, "")}`;
    })();
    return (
        <div className={styles.cplayerdetails}>
            <div className={styles.detailsimg}>
                <img src={imageSrc} alt="" onError={(e) => { e.currentTarget.src = "/road.jpg"; }} />
            </div>
            <h3 className={styles.detailstitle}>{title}</h3>
            <h4 className={styles.detailsartist}>{user?.username || ''}</h4>
        </div>
    )
}

export default Details
