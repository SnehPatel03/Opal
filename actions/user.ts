"use server";

import { sendEmail } from "@/helper/sendMail";
import { prisma } from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer";

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

export const inviteMember = async (
  receiverId: string,
  workspaceId: string,
  email: string,
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const senderInfo = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    });
    if (senderInfo?.id) {
      const workspace = await prisma.workspace.findUnique({
        where: {
          id: workspaceId,
        },
        select: {
          name: true,
        },
      });
      if (workspace) {
        const invitation = await prisma.invite.create({
          data: {
            senderId: senderInfo.id,
            receiverId,
            workspaceId,
            content: `You are invited to join ${workspace.name} Workspace , click accept to confirm`,
          },
          select: {
            id: true,
          },
        });

        await prisma.user.update({
          where: {
            id:receiverId,
          },
          data: {
            notification: {
              create: {
                content: `${senderInfo.firstname} ${senderInfo.lastname} invited you to join ${workspace.name}.`,
              },
            },
          },
        });
        if (invitation) {
          const { transporter, mailOptions } = sendEmail(
            email,
            "You've Got a Workspace Invitation",
            `You are invited to the workspace "${workspace.name}". Click the link below to accept your invitation.`,
            `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Workspace Invitation</h2>

      <p>Hello,</p>

      <p>
        You have been invited to join the
        <strong>${workspace.name}</strong> workspace.
      </p>

      <p style="margin: 30px 0;">
        <a
          href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}"
          style="
            background-color:#2563eb;
            color:#ffffff;
            text-decoration:none;
            padding:12px 24px;
            border-radius:6px;
            display:inline-block;
            font-weight:bold;
          "
        >
          Accept Invitation
        </a>
      </p>

      <p>
        If the button doesn't work, copy and paste this link into your browser:
      </p>

      <p>
        <a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}">
          ${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}
        </a>
      </p>

      <hr />

      <p style="font-size:12px;color:#666;">
        If you weren't expecting this invitation, you can safely ignore this email.
      </p>
    </div>
  `,
          );

          try {
            await transporter.sendMail(mailOptions);
            console.log("mail sent 😮‍💨 ");
          } catch (error) {
            console.log("🧐 Error aa gaya bapu", error);
          }
          return { status: 200, data: "invitation Sent" };
        }
        return { status: 400, data: "invitation Failed!" };
      }
      return { status: 400, data: "workspace not found" };
    }
    return { status: 400, data: "recipient not found" };
  } catch (error) {
    console.log("error in mail sending or memeber action :", error);
    return { status: 400, data: "Oops! Something went wrong" };
  }
};
