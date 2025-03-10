/**
 * @file 用于 logger 配置
 */
import { getAppAsarOutput } from '@/electron/helper';
import { TimeUtility } from '@/common/utils';
import FileSystemUtils from '@/electron/utils/fileSystem';

interface LoggerOptions {
  /* 日志文件名: 默认 - cache/debug/logger.log */
  filename: string;
  /* 日期时间格式*/
  format: string;
}

class Logger {
  public static instance: Logger;
  private _filepath: string;
  private _format: string;
  private static _options: LoggerOptions = {
    filename: 'cache/debug/logger.log',
    format: 'YYYY-MM-DD HH:mm:ss'
  };

  private constructor(options: LoggerOptions) {
    this._filepath = getAppAsarOutput(options.filename);
    this._format = options.format;
    FileSystemUtils.writeFile(this._filepath);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Logger(this._options);
    }
    return this.instance;
  }

  getFilepath() {
    return this._filepath;
  }

  getFormat() {
    return this._format;
  }

  log(...args: unknown[]) {
    /* 日志格式: [日期时间] + [类型] + 输出信息(...args) */
    FileSystemUtils.writeFile(
      this._filepath,
      `[${TimeUtility.getCurrentDateTime()}] ${args.join(' ')}\n`,
      {
        flag: 'a'
      }
    );
  }
}

export default Logger;
