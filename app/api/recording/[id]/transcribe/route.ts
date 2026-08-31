import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();

    const media = await prisma.media.findUnique({
      where: {
        id,
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

    const transcrib = await prisma.video.update({
      where: {
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
      message: "Transcript generated",
      data: transcrib,
    });
  } catch (error) {
    console.error(
      "Error in transcribe Endpoint:",
      error,
    );

    return NextResponse.json(
      {
        status: 500,
        message: "Failed to generate transcript",
      },
      { status: 500 },
    );
  }
}