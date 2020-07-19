import { Node, Component, Style } from "./figma.types";

interface IdsOptions {
  ids: string[];
}

export interface GetFileNodesOptions extends IdsOptions {}

export interface GetImageOptions extends IdsOptions {
  format: "svg" | "jpg" | "png" | "pdf";
}

export interface GetFileResult {
  name: string;
  lastModified: string;
  thumbnailURL: string;
  version: string;
  document: Node<"DOCUMENT">;
  components: { [nodeId: string]: Component };
  schemaVersion: number;
  styles: { [styleName: string]: Style };
}

export interface GetFileNodesResult {
  name: string;
  lastModified: string;
  thumbnailURL: string;
  version: string;
  err?: string;
  nodes: {
    [nodeId: string]: {
      document: Node<"DOCUMENT">;
      components: { [nodeId: string]: Component };
      schemaVersion: number;
      styles: { [styleName: string]: Style };
    } | null;
  };
}

export interface GetImageResult {
  err?: string;
  images: { [nodeId: string]: string | null };
  status?: number;
}
