import React from "react";
import { Modal } from "../Modal";
import { FolderSync } from "lucide-react";
import ChangeVideoLocation from "../../Forms/ChangeVideoLocation";

type Props = {
  videoId: string;
  currentWorkspace: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const VideoMenu = ({
  videoId,
  currentWorkspace,
  currentFolder,
  currentFolderName,
}: Props) => {
  return (
    <Modal
      title="Move Video"
      description="Choose a new workspace or folder for this video."
      className="sm:max-w-xl"
      trigger={
        <div
          className="
            group flex cursor-pointer items-center gap-2
            rounded-xl border border-zinc-700
            bg-zinc-900/80
            px-3 py-2
            backdrop-blur-md
            transition-all duration-200
            hover:border-neutral-400
            hover:bg-zinc-800
            active:scale-95
          "
        >
          <FolderSync
            size={17}
            className="text-zinc-400 transition-colors group-hover:text-white"
          />


        </div>
      }
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentWorkspace={currentWorkspace}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
      />
    </Modal>
  );
};

export default VideoMenu;