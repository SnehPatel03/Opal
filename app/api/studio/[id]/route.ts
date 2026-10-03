import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const { userId: clerkId } = await auth({
      acceptsToken: "session_token",
    });

    if (!clerkId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingMedia = await prisma.media.findUnique({
      where: { id },
      select: { User: { select: { clerkid: true } } },
    });

    if (!existingMedia) {
      return NextResponse.json({ message: "Studio not found" }, { status: 404 });
    }

    if (existingMedia.User?.clerkid !== clerkId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

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