// next imports
import Head from 'next/head';


// react imports 
import { useState, useRef } from 'react';

// css imports
import styles from '../styles/Home.module.css'

function Home() {
  const [carInfo, setCarInfo] = useState({});
  const [vinText, setVinText] = useState('');
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const vinInputElementRef = useRef();

  const fetcher = async (nextAPIURL) => {
    const response = await fetch(nextAPIURL, {
      headers: {
        "vin": vinText,
      }
    });

    const carDataUnformatted = await response.json();

    const { hasError, carInfo } = carDataUnformatted;

    if (hasError) {
      setCarInfo({});
      setShowResults(false);
      return setError(hasError);
    }

    console.log('carinfo data', carInfo);

    console.log('haserr', hasError);

    setShowResults(true);

    setCarInfo(() => carInfo);
  }

  const onChangeHandleInput = (e) => {
    const vinInput = e.target.value;

    setVinText(vinInput);
  }

  const handleVinSearch = async () => {
    if (vinText.length !== 17) return setFormatError(true);

    setIsLoading(true);

    setFormatError(false);

    await fetcher('/api/vin');

    setHasSearched(true);

    setIsLoading(false);

    if (error) return setShowResults(false);

    setShowResults(true);
  }

  const findCarInfoEnter = (e) => {
    if (e.key === 'Enter') {
      handleVinSearch();
    }
  }

  const findCarInfo = () => {
    handleVinSearch();
  };

  const resetAllConditions = (e) => {
    if (e.key === 'Enter') {
      vinInputElementRef.current.value = '';
      setCarInfo(null);
      setVinText('');
      setError(false);
      setHasSearched(false);
      setFormatError(false);
      setShowResults(false);
      setIsLoading(false);
    }
  }

  const resetAllConditionsClick = (e) => {
    vinInputElementRef.current.value = '';
    setCarInfo(null);
    setVinText('');
    setError(false);
    setHasSearched(false);
    setFormatError(false);
    setShowResults(false);
    setIsLoading(false);
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>VIN Finder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        hasSearched &&
        <section className={styles.message}>
          {
            error &&
            <p className={styles.error}>Failed to find by the VIN you entered, please make you entered a valid VIN.</p>
          }

          {
            Object.keys(carInfo?.data || {}).length < 0 &&
            <p className={styles.noCarInfoFound}>Unable to find your vehicle's information</p>
          }

          {
            Object.keys(carInfo?.data || {}).length > 0 &&
            !error &&
            <p className={styles.success}>Vehicle information successfully found by the VIN you provided!</p>
          }
        </section>
      }
      <h1 className={styles.h1}>Find Vehicle Information by VIN Number</h1>
      <form className={styles.inputContainer}>
        {
          formatError &&
          <p>VIN number must be 17 characters long. Current count: {vinText.length} </p>
        }
        <input ref={vinInputElementRef} onChange={onChangeHandleInput} placeholder='Enter VIN number (e.g. WVWTU93C87E093715)' />
        <button type="button" onClick={findCarInfo} onKeyDown={findCarInfoEnter}>{
          isLoading ?
            <div className={styles.loading}></div> : 'Search'
        }</button>
      </form>
      {
        console.log('carinfro from render', carInfo)
      }
      {
        showResults && Object.keys(carInfo || {}).length > 0 &&
        <ul className={styles.ul}>
          <li>Year: <span>{carInfo.year}</span></li>
          <li>Make: <span>{carInfo.make}</span></li>
          <li>Model: <span>{carInfo.model}</span></li>
          <li>Manufacturer: <span>{carInfo.manufacturer}</span></li>
          <li>Engine: <span>{carInfo.engine}</span></li>
          <li>Trim: <span>{carInfo.trim}</span> </li>
          <li>Transmission: <span>{carInfo.transmission}</span></li>
        </ul>
      }
      {
        hasSearched &&
        <button onKeyDown={resetAllConditions} onClick={resetAllConditionsClick} >Reset All</button>
      }
      <p>Vin Finder© created by Brian Ruff</p>
    </main >
  )
}

export default Home;