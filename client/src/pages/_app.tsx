import DefaultLayout from '@/components/Layout/default'
import { fetcher } from '@/utils/fetcher'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { SWRConfig } from 'swr'

type NextPageWithLayout = NextPage & {
  getLayout?: (pageProps: AppProps, page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return (
      <SWRConfig value={{ fetcher }}>
        {Component.getLayout(pageProps, <Component {...pageProps} />)}
      </SWRConfig>
    )
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SWRConfig>
  )
}
