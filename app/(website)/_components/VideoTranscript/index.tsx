import { TabsContent } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

type Props = {
  transcript: string;
};

const VideoTranscript = ({ transcript }: Props) => {
  return (
    <TabsContent
      value="Transcript"
      className="mt-4 rounded-xl border border-zinc-800 bg-[#171717] p-5"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
          <FileText className="h-4 w-4 text-zinc-300" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Transcript</h3>
          <p className="text-xs text-zinc-500">
            AI generated transcript
          </p>
        </div>
      </div>

      <div className="max-h-105 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
        {transcript ? (
          <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
            {transcript}
          </p>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-sm text-zinc-500">
              Transcript is not available.
            </p>
          </div>
        )}
      </div>
    </TabsContent>
  );
};

export default VideoTranscript;