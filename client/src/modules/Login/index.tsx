import { createSession } from '@services/index'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Login() {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const { username, password } = values
      await createSession({ username, password })
      router.push('/')
    },
  })

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={formik.handleSubmit}
      >
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="border border-gray-300 rounded-md p-2 mb-2 text-black"
        />
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="border border-gray-300 rounded-md p-2 mb-2 text-black"
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <button type="submit" className="bg-blue-500 rounded-md p-2 text-black">
          Login
        </button>
      </form>
    </div>
  )
}
