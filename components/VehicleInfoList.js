import styles from '../styles/Home.module.css';

function VehicleInfoList({ carInfo }) {
    if (Object.keys(carInfo || {}).length) {
        const { year, make, model, manufacturer, engine, trim, transmission } = carInfo;

        return (
            <ul className={styles.ul}>
                <li>Year: <span>{year}</span></li>
                <li>Make: <span>{make}</span></li>
                <li>Model: <span>{model}</span></li>
                <li>Manufacturer: <span>{manufacturer}</span></li>
                <li>Engine: <span>{engine}</span></li>
                <li>Trim: <span>{trim}</span> </li>
                <li>Transmission: <span>{transmission}</span></li>
            </ul>
        );
    }

    return null;
}

export default VehicleInfoList;
