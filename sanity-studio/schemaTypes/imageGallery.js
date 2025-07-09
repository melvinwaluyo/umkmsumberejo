// sanity-studio/schemaTypes/imageGallery.js
import {defineType, defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'imageGallery',
  type: 'object',
  title: 'Galeri Gambar',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Gambar-gambar',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Gambar',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Teks Alternatif (Deskripsi Gambar)',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
        name: 'layout',
        type: 'string',
        title: 'Tata Letak',
        options: {
            list: [
                {title: '2 Kolom', value: '2-columns'},
                {title: '3 Kolom', value: '3-columns'},
            ],
            layout: 'radio'
        },
        initialValue: '2-columns'
    })
  ],
})