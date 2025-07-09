// sanity-studio/sanity.config.js

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorInput} from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'umkmsumberejo',
  projectId: 'c63kj79t',
  dataset: 'production',
  plugins: [
    structureTool(), 
    visionTool(), 
    colorInput() 
  ],
  schema: {
    types: schemaTypes,
  },
})