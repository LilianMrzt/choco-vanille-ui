import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const cacheDir = path.resolve(dirname, '../node_modules/.cache/storybook/coverage')

// eslint-disable-next-line func-style
async function setup() {
    fs.mkdirSync(cacheDir, { recursive: true })
}

export default setup
