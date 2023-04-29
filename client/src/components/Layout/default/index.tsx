import { FC, ReactNode } from 'react'
import Header from './components/Header'

type DefaultLayoutProps = {
  children: ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <div className="flex justify-center items-center w-full">
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
