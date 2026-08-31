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

    const completeProcessing = await prisma.video.update({
      where: {
        source: body.filename,
      },
      data: {
        processing: false,
      },
    });

    return NextResponse.json({
      status: 200,
      data: completeProcessing,
    });
  } catch (error) {
    console.error(
      "Error in complete route:",
      error,
    );

    return NextResponse.json(
      {
        status: 500,
        message: "Failed to complete processing",
      },
      { status: 500 },
    );
  }
}