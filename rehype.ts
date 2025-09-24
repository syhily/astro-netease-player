import type { Root } from 'hast'
import type {
  MdxJsxAttribute,
  MdxJsxAttributeValueExpression,
  MdxJsxFlowElement,
  MdxJsxTextElement,
} from 'mdast-util-mdx-jsx'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { resolveSongWithoutURL } from './resolver'

function isMusicPlayerNode(
  node: any,
): node is MdxJsxFlowElement | MdxJsxTextElement {
  return (
    (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement')
    && typeof node.name === 'string'
  )
}

const rehypeMusicPlayer: Plugin<[], Root> = () => {
  return async (tree: Root) => {
    const promises: Promise<void>[] = []
    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      if (!isMusicPlayerNode(node)) {
        return
      }
      if (node.name !== 'MusicPlayer') {
        return
      }

      const attrs = node.attributes || []
      const neteaseAttr = attrs.find(
        a => a.type === 'mdxJsxAttribute' && a.name === 'netease',
      ) as MdxJsxAttribute | undefined

      if (!neteaseAttr) {
        return
      }

      // Handle both literal and expression attribute values
      let neteaseId: string | undefined
      if (typeof neteaseAttr.value === 'string') {
        neteaseId = neteaseAttr.value
      }
      else if (
        neteaseAttr.value
        && (neteaseAttr.value as MdxJsxAttributeValueExpression).type
        === 'mdxJsxAttributeValueExpression'
      ) {
        neteaseId = (neteaseAttr.value as MdxJsxAttributeValueExpression).value
      }

      if (!neteaseId) {
        return
      }

      const p = Promise.resolve(resolveSongWithoutURL({ netease: String(neteaseId) })).then((meta) => {
        if (!meta) {
          return
        }

        // Build new attributes
        const extraAttrs: MdxJsxAttribute[] = [
          { type: 'mdxJsxAttribute', name: 'name', value: meta.name },
          { type: 'mdxJsxAttribute', name: 'artist', value: meta.artist },
          { type: 'mdxJsxAttribute', name: 'pic', value: meta.pic },
          { type: 'mdxJsxAttribute', name: 'lyric', value: meta.lyric },
        ]

        // Remove duplicates if already present
        node.attributes = [
          ...attrs.filter(
            a =>
              !(
                a.type === 'mdxJsxAttribute'
                && ['name', 'artist', 'pic', 'lyric'].includes(a.name)
              ),
          ),
          ...extraAttrs,
        ]
      })
      promises.push(p)
    })

    if (promises.length > 0) {
      await Promise.all(promises)
    }
  }
}

export default rehypeMusicPlayer
