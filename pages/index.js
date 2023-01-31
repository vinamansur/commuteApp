import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Weather from '../components/Weather'
import Bikeshare from '../components/Bikeshare'
import Ttc from '../components/Ttc'

export default function Home() {
  return (
    <>
    <h1> Weather now in Toronto - ON</h1>
    <Weather />
    <br/>
    <h1> Bike Share Toronto - info</h1>
    <Bikeshare />
    <h1> TTC info</h1>
    <Ttc />
    </>
  )
}
