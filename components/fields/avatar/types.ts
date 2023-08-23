import { RcFile } from "antd/es/upload";

export type ImageValue =
  | string
  | {
      src: string;
      file: RcFile;
    };
