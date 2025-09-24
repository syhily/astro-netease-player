# Astro Netease Player

A netease music plugin for adding a player to your astro website.
This plugin is based on the [aplayer-ts](https://github.com/liuly0322/aplayer-ts) instead of the aplayer plugin for better tree shaking.

## Install

```bash
# Use npm
npm install -D astro-netease-player

# Use pnpm
pnpm add -D astro-netease-player

# Use yarn
yarn add -D astro-netease-player
```

## Usage

### Modify MDX file

Open any MDX file and insert the `<MusicPlayer netease={1331313370} />` tag.
The `1331313370` can be changed to the music id you like from the Netease music.

If the music is premium member only. You need to switch to a fallback API.
Use `<MusicPlayer netease={1331313370} premium={true} />` instead.

Go the the MDX render logic in your Astro post file. Modify the astro file as the sample shown below.

### Change the render method

```astro
---
import MusicPlayer from 'astro-netease-player/MusicPlayer.astro';

const { Content, headings } = await post.render();
---

<Content components={{ MusicPlayer: MusicPlayer }} />
```

### Add the rehype plugin

Edit your Astro configuration file.

```ts
import rehypeMusicPlayer from 'astro-netease-player/rehype'

{
  integrations: [
    mdx({
      rehypePlugins: [
        rehypeMusicPlayer,
      ],
    }),
  ],
}
```
