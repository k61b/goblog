import { useAuth } from '@hooks/data'
import { TfiWrite } from 'react-icons/tfi'

function Header() {
  const { user } = useAuth()

  return (
    <div className="flex justify-between items-center h-16 text-black relative shadow-sm font-mono bg-gray">
      <div className="flex items-center">
        <a href="/" className="p-4">
          Home
        </a>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <a href="/write" className="p-4 bg-white rounded-lg">
              <TfiWrite />
            </a>
            <span className="p-4">{user.username}</span>
            <a href="/logout" className="p-4">
              Logout
            </a>
          </>
        ) : (
          <>
            <a href="/login" className="p-4">
              Login
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
