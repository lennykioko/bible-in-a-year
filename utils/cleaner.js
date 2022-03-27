// How to get the data
// Postman Collection Link -> https://go.postman.co/workspace/TopTal~d5e83d05-545e-4686-b25c-2f4f5b74fb73/collection/14816949-dd0f906b-bc99-404d-9bce-ff9412beae11?action=share&creator=14816949

// make a GET request to the following url
// https://www.googleapis.com/youtube/v3/playlistItems

// Pass the following params
// key=YOUR_API_KEY
// playlistId=
// part=contentDetails, id, snippet, status
// maxResults=50
// pageToken=NEXT-PAGE_TOKEN from prev result (Youtube's pagination)

// ---------------------------------------------------------------------------

const fs = require("fs")

let cleanedData

try {
  const data = fs.readFileSync("cachedData.json", "utf8")
  const parsedData = JSON.parse(data.toString())

  cleanedData = parsedData.items.map((item) => {
    let trimmedTitle = item?.snippet?.title.includes("|")
      ? item?.snippet?.title.split("|")[0]
      : item?.snippet?.title.split("—")[0]
    const data = {
      id: item?.id,
      title: trimmedTitle,
      thumbnailUrl: item?.snippet?.thumbnails?.standard?.url,
      playlistId: item?.snippet?.playlistId,
      videoId: item?.contentDetails?.videoId,
      status: item?.status?.privacyStatus,
    }
    return data
  })
} catch (err) {
  console.error(err)
}

try {
  const output = JSON.stringify({ items: cleanedData })
  fs.writeFileSync("cleanedData.json", output)
  console.log("File written successfully")
} catch (err) {
  console.error(err)
}
