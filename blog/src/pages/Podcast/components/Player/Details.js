import React from 'react'
import styles from './Index.module.css'
import { useContext, useState } from "react";
import { Context } from "../../../../context/Context";
function Details({img,title}) {
    const { user } = useContext(Context);
    return (
        <div className={styles.cplayerdetails}>
            <div className={styles.detailsimg}>
                <img src={img} alt="" />
            </div>
            <h3 className={styles.detailstitle}>{title}</h3>
            <h4 className={styles.detailsartist}>{user.username}</h4>
        </div>
    )
}

export default Details
