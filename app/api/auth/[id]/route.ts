import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
)
{
  console.log("Endoint Hitted!!✅")
  try {
    const { id } = await params;

    const userProfile = await prisma.user.findUnique({
      where: {
        clerkid: id,
      },
      include: {
        studio: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    // User already exists
    if (userProfile) {
      return NextResponse.json({
        status: 200,
        data: userProfile,
      });
    }

    // Initialize Clerk client
    const client = await clerkClient();

    // Get user from Clerk
    const clerkUserInstance = await client.users.getUser(id);

    // Create user in database
    const createUser = await prisma.user.create({
      data: {
        clerkid: id,
        email: clerkUserInstance.emailAddresses[0].emailAddress,
        firstname: clerkUserInstance.firstName,
        lastname: clerkUserInstance.lastName,

        studio: {
          create: {},
        },

        workspace: {
          create: {
            name: `${clerkUserInstance.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },

        subscription: {
          create: {},
        },
      },

      include: {
        studio: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 201,
      data: createUser,
    });
  } catch (error) {
    console.error("GET /api/profile/[id] error:", error);
    return NextResponse.json(
      {
        status: 500,
        error: "Something went wrong",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}