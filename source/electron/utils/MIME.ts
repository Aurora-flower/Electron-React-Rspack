import { extname } from "node:path"

interface MimeModel {
  /* MIME 类型 */
  mime: string
  /* 含义 */
  represent: string
  /* 描述 */
  description: string
}

export const MIME_TYPES = {
  ".txt": {
    mime: "text/plain",
    represent: "文本文件",
    description: "文本文件"
  },
  ".html": {
    mime: "text/html",
    represent: "HTML 文档",
    description: "超文本标记语言 (HTML)"
  },
  ".css": {
    mime: "text/css",
    represent: "CSS 文件",
    description: "层叠样式表 (CSS)"
  },
  ".js": {
    mime: "application/javascript",
    represent: "JavaScript 文件",
    description: "JavaScript 程序代码"
  },
  ".json": {
    mime: "application/json",
    represent: "JSON 文件",
    description: "JavaScript 对象表示法 (JSON)"
  },
  ".png": {
    mime: "image/png",
    represent: "PNG 图片",
    description: "便携式网络图形 (PNG)"
  },
  ".jpeg": {
    mime: "image/jpeg",
    represent: "JPEG 图片",
    description: "联合图像专家组 (JPEG)"
  },
  ".jpg": {
    mime: "image/jpeg",
    represent: "JPEG 图片",
    description: "联合图像专家组 (JPEG)"
  },
  ".gif": {
    mime: "image/gif",
    represent: "GIF 图片",
    description: "图形交换格式 (GIF)"
  },
  ".mp4": {
    mime: "video/mp4",
    represent: "MP4 视频",
    description: "MPEG-4 视频文件"
  },
  ".mp3": {
    mime: "audio/mpeg",
    represent: "MP3 音频",
    description: "MPEG 音频层 3 (MP3)"
  },
  ".mpeg": {
    mime: "audio/mpeg",
    represent: "MPEG 音频",
    description: "MPEG 音频层 3 (MP3)"
  },
  ".pdf": {
    mime: "application/pdf",
    represent: "PDF 文件",
    description: "便携式文档格式 (PDF)"
  },
  ".zip": {
    mime: "application/zip",
    represent: "ZIP 压缩文件",
    description: "ZIP 压缩格式"
  },
  ".xls": {
    mime: "application/vnd.ms-excel",
    represent: "Excel 文件",
    description: "Microsoft Excel 文件"
  },
  ".xlsx": {
    mime: "application/vnd.ms-excel",
    represent: "Excel 文件",
    description: "Microsoft Excel 文件"
  },
  ".doc": {
    mime: "application/msword",
    represent: "Word 文件",
    description: "Microsoft Word 文件"
  },
  ".docx": {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    represent: "Word 文件",
    description: "Microsoft Word (OpenXML) 文件"
  },
  ".aac": {
    mime: "audio/aac",
    represent: "AAC 音频",
    description: "Advanced Audio Coding (AAC) 音频文件"
  },
  ".sh": {
    mime: "application/x-sh",
    represent: "Shell 脚本",
    description: "Unix/Linux Shell 脚本"
  },
  ".ttf": {
    mime: "font/ttf",
    represent: "TrueType 字体",
    description: "TrueType 字体文件"
  },
  ".bin": {
    mime: "application/octet-stream",
    represent: "二进制文件",
    description: "通用二进制文件"
  },
  ".bat": {
    mime: "application/bat",
    represent: "批处理文件",
    description: "Windows 批处理文件"
  }
}

export function isValidMime(mime: string): boolean {
  return Object.values(
    MIME_TYPES as Record<keyof typeof MIME_TYPES, MimeModel>
  ).some(entry => entry.mime === mime)
}

export function getMimeType(filePath: string): string {
  const extension = extname(filePath).toLowerCase()
  const mimeType = MIME_TYPES[extension]
  return mimeType ? mimeType.mime : "application/octet-stream"
}
