import siteConfig from '~/site.config'
import { Resvg } from '@resvg/resvg-js'
import type { APIContext, InferGetStaticPropsType } from 'astro'
import satori, { type SatoriOptions } from 'satori'
import sharp from 'sharp'
import Color from 'color'
import { dateString, getSortedPosts, resolveThemeColorStyles } from '~/utils'
import fs from 'node:fs'
import path from 'node:path'
import type { ReactNode } from 'react'

const WIDTH = 1200
const HEIGHT = 630
const AVATAR_SIZE = 320

const fontData = fs.readFileSync(
  path.resolve(
    './node_modules/@expo-google-fonts/jetbrains-mono/400Regular/JetBrainsMono_400Regular.ttf',
  ),
)

// Downscale once: a full-size avatar makes every card slow to rasterize.
const avatarPath = path.resolve(siteConfig.socialCardAvatarImage)
const avatarSrc = fs.existsSync(avatarPath)
  ? `data:image/jpeg;base64,${(
      await sharp(avatarPath)
        .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: 'cover' })
        .jpeg({ quality: 85 })
        .toBuffer()
    ).toString('base64')}`
  : undefined

const defaultTheme =
  siteConfig.themes.default === 'auto'
    ? siteConfig.themes.include[0]
    : siteConfig.themes.default
const themeStyles = await resolveThemeColorStyles(
  [defaultTheme],
  siteConfig.themes.overrides,
)
const bg = themeStyles[defaultTheme]?.background
const fg = themeStyles[defaultTheme]?.foreground
const accent = themeStyles[defaultTheme]?.accent
if (!bg || !fg || !accent) {
  throw new Error(`Theme ${defaultTheme} does not have required colors`)
}
const accentFaded = Color(accent).alpha(0.3).rgb().string()

const ogOptions: SatoriOptions = {
  fonts: [{ data: fontData, name: 'JetBrains Mono', style: 'normal', weight: 400 }],
  width: WIDTH,
  height: HEIGHT,
}

type Node = { type: string; props: Record<string, unknown> }
const h = (
  type: string,
  style: Record<string, unknown>,
  children?: Node | string | (Node | string | false)[],
  attrs: Record<string, unknown> = {},
): Node => ({
  type,
  props: {
    ...attrs,
    style,
    children: Array.isArray(children) ? children.filter(Boolean) : children,
  },
})

// Built as a plain element tree: satori-html takes ~9s to parse a base64 avatar string.
const card = (title: string, pubDate: string | undefined, author: string) =>
  h(
    'div',
    {
      display: 'flex',
      width: '100%',
      height: '100%',
      padding: 48,
      backgroundColor: bg,
      color: fg,
      fontFamily: 'JetBrains Mono',
    },
    h(
      'div',
      {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: 32,
        gap: 32,
        border: `12px solid ${accentFaded}`,
        borderRadius: 80,
      },
      [
        !!avatarSrc &&
          h('img', { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: 9999 }, undefined, {
            src: avatarSrc,
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
          }),
        h(
          'div',
          {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          },
          [
            !!pubDate && h('div', { fontSize: 30, color: accent }, pubDate),
            h(
              'div',
              {
                fontSize: title.length > 70 ? 40 : title.length > 40 ? 48 : 56,
                lineHeight: 1.3,
                margin: '32px 0',
              },
              title,
            ),
            author !== title && h('div', { fontSize: 36, color: accent }, author),
          ],
        ),
      ],
    ),
  )

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export async function GET(context: APIContext) {
  const { pubDate, title, author } = context.props as Props
  const svg = await satori(card(title, pubDate, author) as unknown as ReactNode, ogOptions)
  const png = new Resvg(svg).render().asPng()
  return new Response(new Uint8Array(png), {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': 'image/png',
    },
  })
}

export async function getStaticPaths() {
  const posts = await getSortedPosts()
  return posts
    .map((post) => ({
      params: { slug: post.id },
      props: {
        pubDate: post.data.published ? dateString(post.data.published) : undefined,
        title: post.data.title,
        author: post.data.author || siteConfig.author,
      },
    }))
    .concat([
      {
        params: { slug: '__default' },
        props: { pubDate: undefined, title: siteConfig.title, author: siteConfig.author },
      },
    ])
}
