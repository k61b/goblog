import { useAuth } from '@hooks/data'

function Header() {
  const { user } = useAuth()

  return (
    <div className="flex justify-between items-center h-16 text-black relative shadow-sm font-mono bg-gray">
      <div className="flex items-center">
        <a href="/" className="p-4">
          Home
        </a>
        <a href="/about" className="p-4">
          About
        </a>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
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
