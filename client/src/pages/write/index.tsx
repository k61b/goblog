import DefaultLayout from '@components/Layout/default'
import Write from '@modules/Write'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement } from 'react'

function WritePage() {
  return (
    <>
      <Head>
        <title>Codex | Write</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Write />
    </>
  )
}

WritePage.getLayout = function getLayout(
  pageProps: AppProps,
  page: ReactElement
) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default WritePage
