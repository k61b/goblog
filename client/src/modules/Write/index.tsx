import { createPost } from '@services/index'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Write() {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      content: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const { title, content } = values
      const post = await createPost({ title, content })
      router.push(`/post/${post.id}`)
    },
  })

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Write</h1>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={formik.handleSubmit}
      >
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="border border-gray-300 rounded-md p-2 mb-2 text-black"
        />
        {formik.errors.title ? <div>{formik.errors.title}</div> : null}
        <textarea
          id="content"
          name="content"
          placeholder="Content"
          onChange={formik.handleChange}
          value={formik.values.content}
          className="border border-gray-300 rounded-md p-2 mb-2 text-black"
        />
        {formik.errors.content ? <div>{formik.errors.content}</div> : null}
        <button type="submit" className="bg-blue-500 rounded-md p-2 text-black">
          Submit
        </button>
      </form>
    </div>
  )
}
