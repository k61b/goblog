import PostModule from '@modules/Post'
import DefaultLayout from '@components/Layout/default'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement } from 'react'

function PostPage() {
  return (
    <>
      <Head>
        <title>Codex | Post</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostModule />
    </>
  )
}

PostPage.getLayout = function getLayout(
  pageProps: AppProps,
  page: ReactElement
) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default PostPage
