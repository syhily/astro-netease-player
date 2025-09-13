import { getHighResSongUrl, getSongInfo } from './services';

export type Song = {
  name: string;
  artist: string;
  url: string;
  pic: string;
};

// The props for music player. We support both netease music and direct linked music.
export interface MusicPlayerProps {
  netease?: string;
  song?: Song;
}

const emptySong = { name: '', artist: '', url: '', pic: '' };

const song = async (props: MusicPlayerProps): Promise<Song> => {
  const { netease, song } = props;

  if (netease) {
    const info = await getSongInfo(netease);
    const url = await getHighResSongUrl(netease);

    // Check the return result.
    return {
      name: info.name,
      artist: info.artists !== undefined ? info.artists[0].name : '',
      url: url || `https://music.163.com/song/media/outer/url?id=${netease}.mp3`,
      pic: info.album?.picUrl || '',
    };
  }

  if (song) {
    return song;
  }

  console.error('No song information is provided, check your code.');
  return emptySong;
};

export const resolveSong = async (props: MusicPlayerProps): Promise<Song> => {
  // Try-catch for avoiding the unexpected errors.
  try {
    return await song(props);
  } catch (e) {
    return emptySong;
  }
};
