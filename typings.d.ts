export interface Item {
  id: string
  title: string
  description: string
  thumbnailUrl: Thumbnail
  channelTitle: string
  playlistId: string
  videoId: string
  status: string
}

export interface Thumbnail {
  url: string
  width: number
  height: number
}
