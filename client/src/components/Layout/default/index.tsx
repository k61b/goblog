import { FC, ReactNode } from 'react'

type DefaultLayoutProps = {
  children: ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
