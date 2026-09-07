import { prisma } from "@/lib/prisma";
import { trimVideo } from "@/lib/Videos/trim-video";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ videoId: string }> },
) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Authorized",
        },
        {
          status: 401,
        },
      );
    }
    const { videoId } = await params;
    const body = await req.json();
    const { startTime, endTime } = body;
    if (typeof startTime !== "number" || typeof endTime !== "number") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid startTime or endtime must be numbers",
        },
        {
          status: 400,
        },
      );
    }
    if (startTime < 0 || endTime <= startTime) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid trim range",
        },
        { status: 400 },
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkid: clerkId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Exist!",
        },
        { status: 403 },
      );
    }

    const video = await prisma.video.findFirst({
      where: {
        userId: user.id,
        id: videoId,
      },
    });
    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "No video Found!",
        },
        { status: 404 },
      );
    }
    if (!video.videoUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Video URL not found",
        },
        { status: 400 },
      );
    }
    const trimmedVideo = await trimVideo({
      videoUrl: video.videoUrl,
      startTime,
      endTime,
    });
    console.log("---------------------------------")

    console.log("Trimmed FIle res : ", trimmedVideo);
    
    console.log("---------------------------------")
    return NextResponse.json({
      success: true,
      data: {
        originalVideoId: video.id,
        trimmedVideoUrl: trimmedVideo.url,
        trimmedFileId: trimmedVideo.fileId,
        startTime,
        endTime,
        originalFileId: video.fileId,
      },
    });
  } catch (error) {
    console.log("triming functionality Err", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
