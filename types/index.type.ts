export type WorkspaceProps = {
  status: number;
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;

    workspace: {
      id: string;
      name: string;
      type: "PUBLIC" | "PERSONAL";
    }[];

    members: {
      Workspace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};
export type NotifactionProps = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

export type VideosProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
    } | null;

    id: string;
    processing: boolean;
    Folder: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
    title: string | null;
    source: string;
  }[];
};

export type VideoProps = {
  status: number;
  data: {
    User: {
      firstname: string;
      lastname: string;
      clerkid: string;
      image: string | null;
      trial: boolean;
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    } | null;
    title: string | null;
    description: string | null;
    source: string;
    views: number;
    createdAt: Date;
    processing: boolean;
    summery: string;
  };
  author: boolean;
  relativeDate: string;
};

export type CommentRepliersProps = {
  id: string;
  comment: string;
  createdAt: Date;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
  User: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    createdAt: Date;
    clerkid: string;
    image: string | null;
    trial: boolean;
    firstView: boolean;
  } | null;
  reply: CommentRepliersProps[];
};

export type VideoCommentsProps = {
  data: {
    User: {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
      createdAt: Date;
      clerkid: string;
      image: string | null;
      trial: boolean;
      firstView: boolean;
    } | null;
    reply: CommentRepliersProps[];
    id: string;
    comment: string;
    createdAt: Date;
    commentId: string | null;
    userId: string | null;
    videoId: string | null;  
  }[];
};
