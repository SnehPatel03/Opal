"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 403,
      };
    }

    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              some: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });

    return {
      status: 200,
      data: {
        workspace,
      },
    };
  } catch (error) {
    console.error("Error verifying workspace access:", error);

    return {
      status: 500,
      data: {
        workspace: null,
      },
    };
  }
};

export const getWorkspaceFolders = async (workspaceId: string) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        workspaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    return {
      status: 200,
      data: folders,
    };
  } catch (error) {
    console.error("Error fetching workspace folders:", error);

    return {
      status: 500,
      data: [],
    };
  }
};

export const getAllUserVideos = async (workspaceId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        data: [],
      };
    }

    const videos = await prisma.video.findMany({
      where: {
        OR: [
          { workspaceId },
          { folderId: workspaceId },
        ],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      status: 200,
      data: videos,
    };
  } catch (error) {
    console.error("Error fetching videos:", error);

    return {
      status: 500,
      data: [],
    };
  }
};

export const getWorkspaces = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
      };
    }

    const workspaces = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            type: true,
            name: true,
          },
        },
        members: {
          select: {
            Workspace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (!workspaces) {
      return {
        status: 404,
      };
    }

    return {
      status: 200,
      data: workspaces,
    };
  } catch (error) {
    console.error("Error fetching workspaces:", error);

    return {
      status: 500,
    };
  }
};