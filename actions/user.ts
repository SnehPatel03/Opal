"use server";

import { sendEmail } from "@/helper/sendMail";
import { prisma } from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer";
import { use } from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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
            id: receiverId,
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

export const acceptInvite = async (inviteId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const invite = await prisma.invite.findUnique({
      where: {
        id: inviteId,
      },
      select: {
        workspaceId: true,
        receiver: {
          select: {
            clerkid: true,
          },
        },
      },
    });
    if (!invite) {
      return { status: 404, data: "Invitation not found" };
    }

    if (user.id !== invite?.receiver.clerkid)
      return { status: 401, data: "Unauthorized user!" };

    const acceptInvite = prisma.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        accepted: true,
      },
    });

    const updateMember = prisma.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        members: {
          create: {
            workspaceId: invite.workspaceId,
          },
        },
      },
    });

    const membersTransaction = await prisma.$transaction([
      acceptInvite,
      updateMember,
    ]);
    if (membersTransaction) {
      return { status: 200 };
    }
    return { status: 400 };
  } catch (error) {
    return { status: 400 };
  }
};

export const sendEmailForFirstView = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const firstViewSettings = await prisma.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });
    if (!firstViewSettings?.firstView) return;

    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        views: true,
        title: true,
        User: {
          select: {
            email: true,
          },
        },
      },
    });
    if (video && video.views === 0) {
      await prisma.video.update({
        where: {
          id: videoId,
        },
        data: {
          views: video.views + 1,
        },
      });

      if (!video.User?.email)
        return {
          status: 404,
          data: "No email found to sent!{Typicall bug in db design for mail send for first view}",
        };

      const { transporter, mailOptions } = sendEmail(
        video.User?.email,
        "🎉 You got your first viewer on Opal!",
        `Your video "${video.title}" just received its first viewer.`,
        `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0f0f11;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0f0f11;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0"
          style="background:#17181c;border:1px solid #2b2d31;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:32px;text-align:center;background:linear-gradient(135deg,#6d5efc,#4f46e5);">
              <h1 style="margin:0;font-size:34px;font-weight:700;color:#ffffff;">
                Opal
              </h1>
              <p style="margin-top:10px;color:#e6e6ff;font-size:15px;">
                AI Workspace for Modern Creators
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 35px;">

              <h2 style="margin:0 0 18px;font-size:28px;color:#ffffff;">
                🎉 Congratulations!
              </h2>

              <p style="margin:0 0 18px;font-size:16px;line-height:1.8;color:#d1d5db;">
                Your video has just received its
                <strong style="color:#ffffff;">first viewer</strong>.
              </p>

              <div style="
                  margin:28px 0;
                  padding:22px;
                  background:#202228;
                  border:1px solid #34363d;
                  border-radius:12px;
              ">
                <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;text-transform:uppercase;letter-spacing:1px;">
                  Video
                </p>

                <h3 style="margin:0;font-size:22px;color:#ffffff;">
                  ${video.title}
                </h3>
              </div>

              <p style="margin:0 0 30px;font-size:16px;line-height:1.8;color:#d1d5db;">
                Every successful creator starts with a single viewer.
                Keep publishing consistently and watch your audience grow.
              </p>

              <div style="text-align:center;">
                <a
                  href="${process.env.NEXT_PUBLIC_HOST_URL}/dashboard"
                  style="
                    display:inline-block;
                    background:#6d5efc;
                    color:#ffffff;
                    text-decoration:none;
                    padding:14px 34px;
                    border-radius:10px;
                    font-size:16px;
                    font-weight:600;
                  ">
                  Open Dashboard
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px;text-align:center;border-top:1px solid #2b2d31;">
              <p style="margin:0;color:#6b7280;font-size:13px;">
                Thanks for creating with <strong style="color:#ffffff;">Opal</strong>.
              </p>

              <p style="margin-top:10px;color:#6b7280;font-size:12px;">
                © ${new Date().getFullYear()} Opal. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
      );

      try {
        await transporter.sendMail(mailOptions);
        const notification = await prisma.user.update({
          where: {
            clerkid: user.id,
          },
          data: {
            notification: {
              create: {
                content: `Your Video ${video.title} just got a first viewer.`,
              },
            },
          },
        });
        if (!notification) {
          return { status: 404 };
        }
      } catch (error) {
        console.log(
          "Error in mail sending for first view or in notification",
          error,
        );
      }
    }
  } catch (error) {
    console.log("Error in SendEmailForFV action", error);
    return { status: 404 };
  }
};

export const completeSubscription = async (session_id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session) {
      const customer = await prisma.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          subscription: {
            update: {
              data: {
                customerId: session.customer as string,
                plan: "PRO",
              },
            },
          },
        },
      });
      if (customer) {
        return { status: 200 };
      }
    }
    return { status: 404 };
  } catch (error) {
    console.log("Error in payment action", error);
    return { status: 404 };
  }
};
