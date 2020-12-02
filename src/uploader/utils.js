export const ResultType = "dataUrl" | "text" | "file";

export function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}

export function readFile(file, resultType) {
  return new Promise(resolve => {
    if (resultType === "file") {
      resolve();
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      resolve(event.target.result);
    };

    if (resultType === "dataUrl") {
      reader.readAsDataURL(file);
    } else if (resultType === "text") {
      reader.readAsText(file);
    }
  });
}

export function isOversize(files, maxSize) {
  return toArray(files).some(file => file.size > maxSize);
}

export const FileListItem = {
  url: String,
  file: File,
  content: String, // dataUrl
  isImage: Boolean,
  status: "" | "uploading" | "done" | "failed",
  message: String
};

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;

export function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}

export function isImageFile(item) {
  // some special urls cannot be recognized
  // user can add `isImage` flag to mark it as an image url
  if (item.isImage) {
    return true;
  }

  if (item.file && item.file.type) {
    return item.file.type.indexOf("image") === 0;
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  if (item.content) {
    return item.content.indexOf("data:image") === 0;
  }

  return false;
}
