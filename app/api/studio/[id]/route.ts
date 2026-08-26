import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();

    console.log("Media ID:", id);
    console.log("Body:", body);

    const media = await prisma.media.update({
      where: {
        id,
      },
      data: {
        screen: body.screen,
        mic: body.audio,
        preset: body.preset,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Studio Updated!",
      data: media,
    });
  } catch (error) {
    console.error("POST /api/studio/[id] error:", error);

    return NextResponse.json(
      {
        status: 500,
        message: "Unable to update studio settings",
      },
      { status: 500 }
    );
  }
}