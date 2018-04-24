import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';

function getTransformStream() {
  let foundHeader = false;

  return new Transform({
    decodeStrings: true,
    transform: (chunk, _, holaback) => {
      if (foundHeader) return holaback(null, chunk);

      const lines = chunk.toString().split('\n');
      if (lines.length < 2) return holaback();

      foundHeader = true;
      return holaback(null, lines.slice(1).join('\n'));
    },
  });
}

function processStream(src, dest, keepHeader) {
  return new Promise((resolve, reject) => {
    if (keepHeader) {
      src
        .pipe(dest);
    } else {
      src
        .pipe(getTransformStream())
        .pipe(dest);
    }

    dest.on('close', resolve);
    dest.on('error', reject);
  });
}

export default function joinFiles(files, dest) {
  const streams = files.map(path => createReadStream(path, { encoding: 'utf8' }));

  let current = Promise.resolve();
  for (const srcIndex in streams) {
    const src = streams[srcIndex];
    const keepHeader = srcIndex === '0';
    const writeStream = createWriteStream(dest, { encoding: 'utf8', flags: 'a' });
    current = current.then(() => processStream(src, writeStream, keepHeader));
  }

  return current;
}
