import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const postsDir = join(process.cwd(), 'posts')

export async function getPostsName() {
  const files = await readdir(postsDir)
  return files.map((f) => f.replace(/\.md$/, ''))
}

export function getPostContent(id: string) {
  return readFile(join(postsDir, id + '.md'))
}
