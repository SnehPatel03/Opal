"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

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
        OR: [{ workspaceId }, { folderId: workspaceId }],
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
export const CreateWorkspaces = async (name: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 401,
        data: "Please sign in to continue.",
      };
    }

    const authorize = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (authorize?.subscription?.plan !== "PRO") {
      return {
        status: 403,
        data: "Upgrade to Pro to create additional workspaces.",
      };
    }

    await prisma.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        workspace: {
          create: {
            name,
            type: "PUBLIC",
          },
        },
      },
    });

    return {
      status: 200,
      data: "Workspace created successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      data: "Something went wrong. Please try again.",
    };
  }
};

export const renameFolder = async (folderId: string, name: string) => {
  try {
    const folder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });
    if (folder) {
      return { status: 200, data: "Renamed" };
    }
    return { status: 400, data: "Not Renamed" };
  } catch (error) {
    console.log("Error in renameing action", error);
    return { status: 400, data: "oops Something went wrong!" };
  }
};
export const createFolder = async (workspaceId: string) => {
  try {
    await prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folder: {
          create: {
            name: "Untitled",
          },
        },
      },
    });

    return {
      status: 200,
      data: "New folder created successfully",
    };
  } catch (error) {
    console.error("Error creating folder:", error);

    return {
      status: 500,
      data: "Oops! Something went wrong while creating the folder.",
    };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folderInfo = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folderInfo) {
      return { status: 200, data: folderInfo };
    }
    return { status: 200, data: null };
  } catch (error) {
    console.log("Error in folder info getting action ", error);
    return { status: 500, data: "oops! error in getting Folder info" };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  workspaceId: string,
  folderId: string,
) => {
  try {
    const location = await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workspaceId,
      },
    });
    if (location) return { status: 200, data: "folder changed successfully" };
    return { status: 404, data: "folder/workspace not found" };
  } catch (error) {
    return { status: 500, data: " oops! soemthing went wrong" };
  }
};
