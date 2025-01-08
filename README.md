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

### Use in MDX file

Open any MDX file and insert the `<MusicPlayer netease={1331313370} />` tag.
The `1331313370` can be changed to the music id you like from the Netease music.

Go the the MDX render logic in your Astro post file. Modify the astro file as the sample shown below.

```
---
import MusicPlayer from 'astro-netease-player/MusicPlayer.astro';

const { Content, headings } = await post.render();
---

<Content components={{ MusicPlayer: MusicPlayer }} />
```

### Use in Astro component

Simply import the `astro-netease-player/MusicPlayer.astro` and use it as an Astro tag.
