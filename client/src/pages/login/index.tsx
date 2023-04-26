import Login from '@modules/Login'
import DefaultLayout from '@components/Layout/default'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement } from 'react'

function LoginPage() {
  return (
    <>
      <Head>
        <title>Codex | Signin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </>
  )
}

LoginPage.getLayout = function getLayout(
  pageProps: AppProps,
  page: ReactElement
) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default LoginPage
