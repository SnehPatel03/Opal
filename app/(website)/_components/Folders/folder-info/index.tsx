"use client";

import { getFolderInfo } from "@/actions/workspace";
import { userQueryData } from "@/hooks/userQueryData";

type Props = {
  folderId: string;
};

type FolderProps = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };    
};

const FolderInfo = ({ folderId }: Props) => {
  const { data } = userQueryData(["folder-info", folderId], () =>
    getFolderInfo(folderId),
  );

  const folder = (data as FolderProps).data;
  console.log(folder);
  return (
    <div>
      <h2>{folder.name}</h2>
      <p>{folder._count.videos} videos</p>
    </div>
  );
};

export default FolderInfo;
