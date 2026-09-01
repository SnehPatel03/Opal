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

    if (
      !body.filename ||
      !body.transcript ||
      !body.title ||
      !body.summary
    ) {
      return NextResponse.json(
        {
          status: 400,
          message:
            "Filename, transcript, title and summary are required",
        },
        { status: 400 },
      );
    }

    const media = await prisma.media.findUnique({
      where: {
        id: mediaId,
      },
      select: {
        userId: true,
      },
    });

    if (!media) {
      return NextResponse.json(
        {
          status: 404,
          message: "Media not found",
        },
        { status: 404 },
      );
    }

    const transcribe = await prisma.video.update({
      where: {
        userId: media.userId,
        source: body.filename,
      },
      data: {
        title: body.title,
        description: body.summary,
        summery: body.transcript,
      },
    });

    return NextResponse.json({
      status: 200,
      data: transcribe,
    });
  } catch (error) {
    console.error(
      "Error in Transcribe Endpoint:",
      error,
    );

    return NextResponse.json(
      {
        status: 500,
        message:
          "Failed to save transcript and summary",
      },
      { status: 500 },
    );
  }
}