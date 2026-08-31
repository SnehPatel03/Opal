import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.filename) {
      return NextResponse.json(
        {
          status: 400,
          message: "Filename is required",
        },
        { status: 400 },
      );
    }

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

    const user = await prisma.user.findUnique({
      where: {
        id: media.userId,
      },
      select: {
        workspace: {
          where: {
            type: "PERSONAL",
          },
          select: {
            id: true,
          },
          orderBy: {
            createdAt: "asc",
          },
          take: 1,
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: 404,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const workspace = user.workspace[0];

    if (!workspace) {
      return NextResponse.json(
        {
          status: 404,
          message: "Personal workspace not found",
        },
        { status: 404 },
      );
    }

    await prisma.workspace.update({
      where: {
        id: workspace.id,
      },
      data: {
        videos: {
          create: {
            source: body.filename,
            userId: media.userId,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      plan: user.subscription?.plan ?? "FREE",
    });
  } catch (error) {
    console.error(
      "Error in Processing Endpoint:",
      error,
    );

    return NextResponse.json(
      {
        status: 500,
        message: "Failed to start video processing",
      },
      { status: 500 },
    );
  }
}