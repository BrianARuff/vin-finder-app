import styles from '../styles/Home.module.css';

function VinForm({ formatError, findCarInfo, isLoading, vinText, onChangeInput, vinInputElementRef }) {
    const handleFindCarInfo = (e) => {
        e.preventDefault();

        findCarInfo();
    }
    return <form onSubmit={handleFindCarInfo} className={styles.form}>
        {
            formatError &&
            <p>VIN number must be 17 characters long. Current count: {vinText.length} </p>
        }
        <input ref={vinInputElementRef} onChange={onChangeInput} placeholder='Enter VIN number (e.g. WVWTU93C87E093715)' />
        <button className={styles.submitInput} type="submit">{
            isLoading ?
                <div className={styles.loading}></div> : 'Search'
        }</button>
    </form>
}

export default VinForm;