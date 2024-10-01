import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@styles/modules/_page.module.scss'
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <Skeleton count={5} containerClassName={styles.gpt_thread_skeleton} className={styles.gpt_thread_skeleton_item}/>
}