import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(
  req: NextRequest,
  { params }: Props,
) {
  try {
    const { id: mediaId } = await params;
    const body = await req.json();

    if (!body.filename || !body.videoUrl) {
      return NextResponse.json(
        {
          status: 400,
          message: "Filename and video URL are required",
        },
        { status: 400 },
      );
    }

    const completeProcessing =
      await prisma.video.update({
        where: {
          source: body.filename,
        },
        data: {
          videoUrl: body.videoUrl,
          fileId: body.fileId ?? null,
          processing: false,
        },
      });

    return NextResponse.json({
      status: 200,
      data: completeProcessing,
    });
  } catch (error) {
    console.error(
      "Error in Complete Endpoint:",
      error,
    );

    return NextResponse.json(
      {
        status: 500,
        message: "Failed to complete video processing",
      },
      { status: 500 },
    );
  }
}