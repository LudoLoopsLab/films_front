import { IncomingForm } from 'formidable'
import cloudinary from 'cloudinary'
import { getTokenFromServerCookie } from '../../lib/auth'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function upload(req, res) {
  if (req.method === 'POST') {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm()

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })

    const file = data?.files?.inputFile[0].filepath

    const user_id = data.fields.user_id[0]
    try {
      const response = await cloudinary.v2.uploader.upload(file, {
        public_id: user_id[0],
        folder: 'strapiFilm'
      })
      const { public_id } = response
      const jwt = getTokenFromServerCookie(req)
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${user_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            avatar: public_id,
          }),
        }
      )
      const data = await userResponse.json()
      return res.json({ message: 'success' })
    } catch (error) {
      console.error(`${error.name} ${error.http_code}: ${error.message}`)

      return res.json(error)
    }
  } else {
    return res.status(403).send('Forbidden method')
  }
}

