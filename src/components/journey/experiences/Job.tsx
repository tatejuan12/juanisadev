import styles from "@styles/modules/_page.module.scss";
import React from "react";
import NextImage from "next/image";

export interface JobProps {
    name: string,
    image?: string
    position: string,
    startDate: string,
    endDate?: string,
    description: string[],
}

export const Job: React.FC<JobProps> = ({name, position, startDate, endDate = "", description, image}: JobProps) => {
    return (
        <div className={styles.journey_experiences_job}>
            <div className={styles.journey_experiences_job_timeline}></div>
            <div className={styles.journey_experiences_job_header}>
                <NextImage className={styles.journey_experiences_job_header_image} alt={name + 'Image'} width={20}
                           height={20} src={'/' + image}/>
                <div className={styles.journey_experiences_job_header_text}>{name} <br/> {position}</div>
            </div>
            <div className={styles.journey_experiences_job_dates}>{startDate} {endDate && `- ${endDate}`}</div>
            <div className={styles.journey_experiences_job_details}>
                {description.map((detail, index) => (

                    <div key={index} className={styles.journey_experiences_job_details_item}>
                        <div className={styles.journey_experiences_job_details_item_content}>{detail}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};