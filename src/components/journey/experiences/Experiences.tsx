import styles from "@styles/modules/_page.module.scss";
import {Job, JobProps} from "@components/journey/experiences/Job";
import resumeData from "./resume.json"

export default function Experiences() {
    return (
        <div className={styles.journey_experiences}>
            <h2>My Experience</h2>

            <div className={styles.journey_experiences_jobs}>
                <h3>{">"}Professional</h3>
                {resumeData.jobs.map((job, index) => (
                    <Job
                        key={index}
                        name={job.name}
                        position={job.position}
                        startDate={job.startDate}
                        endDate={job.endDate}
                        description={job.details}
                        image={job.image}
                    />
                ))}
            </div>
            <div className={styles.journey_experiences_jobs}>
                <h3>{">"}Education</h3>
                {resumeData.education.map((job, index) => (
                    <Job
                        key={index}
                        name={job.name}
                        position={job.position}
                        startDate={job.startDate}
                        endDate={job.endDate}
                        description={job.details}
                        image={job.image}
                    />
                ))}
            </div>
        </div>
    );
}