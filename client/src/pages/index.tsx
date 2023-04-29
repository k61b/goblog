import Home from '@modules/Home'
import Head from 'next/head'

function HomePage() {
  return (
    <>
      <Head>
        <title>Goblog | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </>
  )
}

export default HomePage
