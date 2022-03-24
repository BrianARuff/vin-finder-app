import styles from '../styles/Home.module.css';

const Message = ({ carInfo, error, hasSearched }) => {
    if (hasSearched) {
        return <section className={styles.message}>
            {
                error &&
                <p className={styles.error}>Failed to find by the VIN you entered, please make you entered a valid VIN.</p>
            }

            {
                Object.keys(carInfo?.data || {}).length > 0 &&
                <p className={styles.success}>Vehicle information successfully found by the VIN you provided!</p>
            }
        </section>
    }

    return null;
};

export default Message;