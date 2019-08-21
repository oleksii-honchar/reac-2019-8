/* eslint-disable camelcase */
import faker from 'faker'
import isEmpty from 'lodash/isEmpty'

function mapCaseItem ({ video } = {}) {
  let videoUrl

  if (video.iframe) {
    videoUrl = video.iframe
  } else if (!isEmpty(video.local)) {
    videoUrl = video.local.url
  }

  return {
    videoUrl,
    videoPlayText: video.video_play_text,
  }
}

function mapGalleryItem ({ video, ...item } = {}) {
  let videoUrl

  if (video.iframe) {
    videoUrl = video.iframe
  } else if (!isEmpty(video.local)) {
    videoUrl = video.local.url
  }

  return {
    key: item.key || faker.random.uuid(),
    imageUrl: item.image,
    videoPlayText: video.video_play_text,
    videoUrl,
  }
}

function mapGallery (data) {
  return (data || [])
    .filter(({ image }) => image)
    .map(mapGalleryItem)
}

export const rootMappers = {
  mapGallery,
  mapGalleryItem,
  mapCaseItem,
}
