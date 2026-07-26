"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticatedUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 403,
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: true,
      },
    });

    if (existingUser) {
      return {
        status: 200,
        data: existingUser,
      };
    }

    const newUser = await prisma.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: true,
      },
    });

    return {
      status: 201,
      data: newUser,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
    };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const notifications = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });
    if (notifications && notifications.notification.length > 0) {
      return { status: 200, data: notifications };
    }
    return { status: 404 };
  } catch (error) {
    console.log("error in getting notification ::", error);
    return { status: 403 };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { email: { contains: query } },
          { lastname: { contains: query } },
        ],
        NOT: [{ clerkid: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        email: true,
        image: true,
      },
    });

    if (users && users.length > 0) {
      return { status: 200, data: users };
    }
    return { status: 400, data: undefined };
  } catch (error) {
    return { status: 500, data: undefined };
  }
};

export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const userData = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });
    if (userData) {
      return { status: 200, data: userData.firstView };
    }
    return { status: 400 };
  } catch (error) {
    console.log("Error in get firts view", error);
    return { status: 400 };
  }
};

export const enableFirstView = async (state: boolean) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 400 };
    }
    const view = await prisma.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        firstView: state,
      },
    });

    if (view) {
      return { status: 200, data: "Setting Updated!" };
    }
    return { status: 400 };
  } catch (error) {
    return { status: 500 };
  }
};
export const createCommentAndReply = async (
  videoId: string,
  comment: string,
  userId: string,
  commentId?: string,
) => {
  try {
    console.log({
      videoId,
      comment,
      userId,
      commentId,
    });

    await prisma.comment.create({
      data: {
        comment,
        videoId,
        userId,
        commentId: commentId ?? null,
      },
    });

    return {
      status: 200,
      data: commentId ? "Reply Added!" : "Comment Added!",
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      data: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 400 };
    }
    const profileInfo = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        image: true,
        id: true,
      },
    });
    if (profileInfo) {
      return { status: 200, data: profileInfo };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

export const getVideoComment = async (id: string) => {
  try {
   const comments = await prisma.comment.findMany({
  where: {
    videoId: id,
    commentId: null,
  },

  orderBy: {
    createdAt: "desc",
  },

  include: {
    User: true,

    reply: {
      orderBy: {
        createdAt: "asc",
      },

      include: {
        User: true,

        reply: {
          orderBy: {
            createdAt: "asc",
          },

          include: {
            User: true,
          },
        },
      },
    },
  },
});
    return { status: 200, data: comments };
  } catch (error) {
    return { status: 400 };
  }
};
