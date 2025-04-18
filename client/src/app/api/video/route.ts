import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("id");

    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(videoURL)
    .then(info => {
      console.log("Video Info Fetched Successfully");
      const format = ytdl.chooseFormat(info.formats, { quality: "highestvideo" });
      console.log("Video URL:", format.url);
    })
    .catch(error => {
      console.error("Error fetching video:", error);
    });

    // Choose the best available video format
    // const format = ytdl.chooseFormat(info.formats, { quality: "highestvideo" });

    // if (!format.url) {
    //   return NextResponse.json({ error: "No video stream available" }, { status: 400 });
    // }

    // return NextResponse.json({ streamUrl: format.url });
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}
