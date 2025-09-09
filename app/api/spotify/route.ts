import { NextResponse } from 'next/server'

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
const SPOTIFY_RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string; height: number; width: number }[]
  }
  external_urls: {
    spotify: string
  }
}

interface SpotifyCurrentlyPlaying {
  item: SpotifyTrack
  is_playing: boolean
  progress_ms: number
}

interface SpotifyRecentlyPlayed {
  items: {
    track: SpotifyTrack
    played_at: string
  }[]
}

async function getAccessToken(): Promise<string> {
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Missing Spotify credentials')
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to get access token')
  }

  const data: SpotifyTokenResponse = await response.json()
  return data.access_token
}

async function getCurrentlyPlaying(accessToken: string): Promise<SpotifyCurrentlyPlaying | null> {
  const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status === 204 || response.status === 404) {
    return null // Nothing playing
  }

  if (!response.ok) {
    throw new Error('Failed to get currently playing')
  }

  return await response.json()
}

async function getRecentlyPlayed(accessToken: string): Promise<SpotifyRecentlyPlayed> {
  const response = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get recently played')
  }

  return await response.json()
}

export async function GET() {
  try {
    const accessToken = await getAccessToken()
    
    // Try to get currently playing first
    const currentlyPlaying = await getCurrentlyPlaying(accessToken)
    
    if (currentlyPlaying?.item) {
      const track = currentlyPlaying.item
      return NextResponse.json({
        isPlaying: currentlyPlaying.is_playing,
        title: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        albumImageUrl: track.album.images[0]?.url || null,
        songUrl: track.external_urls.spotify,
        duration: track.duration_ms,
        progress: currentlyPlaying.progress_ms,
        releaseDate: track.album.release_date,
        explicit: track.explicit,
        popularity: track.popularity,
        trackNumber: track.track_number,
        timestamp: Date.now(),
      })
    }

    // If nothing is currently playing, get the last played track
    const recentlyPlayed = await getRecentlyPlayed(accessToken)
    
    if (recentlyPlayed.items.length > 0) {
      const lastTrack = recentlyPlayed.items[0].track
      return NextResponse.json({
        isPlaying: false,
        title: lastTrack.name,
        artist: lastTrack.artists.map(artist => artist.name).join(', '),
        album: lastTrack.album.name,
        albumImageUrl: lastTrack.album.images[0]?.url || null,
        songUrl: lastTrack.external_urls.spotify,
        duration: lastTrack.duration_ms,
        progress: null, // No progress for last played
        releaseDate: lastTrack.album.release_date,
        explicit: lastTrack.explicit,
        popularity: lastTrack.popularity,
        trackNumber: lastTrack.track_number,
        timestamp: new Date(recentlyPlayed.items[0].played_at).getTime(),
      })
    }

    return NextResponse.json({
      isPlaying: false,
      title: null,
      artist: null,
      album: null,
      albumImageUrl: null,
      songUrl: null,
      timestamp: null,
    })

  } catch (error) {
    console.error('Spotify API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    )
  }
}
