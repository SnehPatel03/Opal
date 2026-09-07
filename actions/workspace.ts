"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    // Route segments can also be requested by the browser for a relative media
    // URL. Do not send a filename (or any non-UUID) to PostgreSQL's UUID field.
    const isWorkspaceId =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        workspaceId,
      );

    if (!isWorkspaceId) {
      return { status: 404, data: { workspace: null } };
    }

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
        videoUrl:true,
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

export const deleteWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, data: "Please sign in to continue." };

    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId, type: "PUBLIC", User: { clerkid: user.id } },
      select: { id: true },
    });
    if (!workspace) return { status: 403, data: "Only workspaces you own can be deleted." };

    await prisma.$transaction([
      prisma.video.deleteMany({ where: { workspaceId } }),
      prisma.folder.deleteMany({ where: { workspaceId } }),
      prisma.member.deleteMany({ where: { workspaceId } }),
      prisma.invite.deleteMany({ where: { workspaceId } }),
      prisma.workspace.delete({ where: { id: workspaceId } }),
    ]);
    return { status: 200, data: "Workspace deleted." };
  } catch (error) {
    console.error("Error deleting workspace:", error);
    return { status: 500, data: "Unable to delete this workspace." };
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

export const deleteFolder = async (folderId: string) => {
  try {
    // A Folder -> Video relation cascades deletes in the schema. Keep the videos
    // available in the workspace when a user removes just the folder.
    await prisma.$transaction([
      prisma.video.updateMany({
        where: { folderId },
        data: { folderId: null },
      }),
      prisma.folder.delete({
        where: { id: folderId },
      }),
    ]);

    return { status: 200, data: "Folder deleted. Its videos were kept." };
  } catch (error) {
    console.error("Error deleting folder:", error);
    return { status: 500, data: "Unable to delete this folder." };
  }
};

export const renameVideo = async (videoId: string, title: string) => {
  try {
    await prisma.video.update({
      where: { id: videoId },
      data: { title },
    });

    return { status: 200, data: "Video renamed." };
  } catch (error) {
    console.error("Error renaming video:", error);
    return { status: 500, data: "Unable to rename this video." };
  }
};

export const deleteVideo = async (videoId: string) => {
  try {
    await prisma.video.delete({
      where: { id: videoId },
    });

    return { status: 200, data: "Video deleted." };
  } catch (error) {
    console.error("Error deleting video:", error);
    return { status: 500, data: "Unable to delete this video." };
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

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();

    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        description: true,
        processing: true,
        views: true,
        summery: true,
        videoUrl:true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            clerkid: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    if (video) {
      const daysAgo = Math.floor(
        (Date.now() - video.createdAt.getTime()) / (24 * 60 * 60 * 1000),
      );

      return {
        status: 200,
        data: video,
        author: user?.id === video.User?.clerkid,
        relativeDate: daysAgo < 1 ? "Today" : `${daysAgo} days ago`,
      };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 500, data: "oops! Something went wrong" };
  }
};
type PaymentDetailsResponse = {
  status: number;
  data: {
    subscription: {
      plan: 'PRO' | 'FREE';
    } | null;
  } | null;
  message?: string;
};
export const getpaymentDetails = async (): Promise<PaymentDetailsResponse> => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 404,
        data: null,
        message: "User not found",
      };
    }

    const payment = await prisma.user.findUnique({
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

    if (!payment) {
      return {
        status: 400,
        data: null,
        message: "Payment details not found",
      };
    }

    return {
      status: 200,
      data: payment,
    };
  } catch {
    return {
      status: 500,
      data: null,
      message: "Oops! Something went wrong.",
    };
  }
};
