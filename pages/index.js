import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Weather from '../components/Weather'

export default function Home() {
  return (
    <>
    <h1> Weather now in Toronto - ON</h1>
    <Weather />
    </>
  )
}
