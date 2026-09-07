import axios from "axios";
import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import ImageKit from "@imagekit/nodejs";

const execFileAsync = promisify(execFile);

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const tempDirectory = path.join(process.cwd(), "temp_upload");

if (!fs.existsSync(tempDirectory)) {
  fs.mkdirSync(tempDirectory, {
    recursive: true,
  });
}

export async function trimVideo({
  videoUrl,
  startTime,
  endTime,
}: {
  videoUrl: string;
  startTime: number;
  endTime: number;
}) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const inputPath = path.join(
    tempDirectory,
    `original-${id}.webm`,
  );

  const outputPath = path.join(
    tempDirectory,
    `trimmed-${id}.webm`,
  );

  try {
    const response = await axios.get(videoUrl, {
      responseType: "arraybuffer",
    });

    await fs.promises.writeFile(
      inputPath,
      Buffer.from(response.data),
    );

    // 2. Calculate trim duration
    const duration = endTime - startTime;

    // 3. Trim using FFmpeg
    await execFileAsync("ffmpeg", [
      "-y",
      "-ss",
      String(startTime),
      "-i",
      inputPath,
      "-t",
      String(duration),
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus",
      outputPath,
    ]);

    const uploadResponse = await imagekit.files.upload({
      file: fs.createReadStream(outputPath),
      fileName: `trimmed-${id}.webm`,
    });

    return {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };
  } finally {
    if (fs.existsSync(inputPath)) {
      await fs.promises.unlink(inputPath);
    }

    if (fs.existsSync(outputPath)) {
      await fs.promises.unlink(outputPath);
    }
  }
}