import { Node, Component, Style } from "./figma.types";

interface IdsOptions {
  ids: string[];
}

export interface GetFileNodesOptions extends IdsOptions {}

export interface GetImageOptions extends IdsOptions {
  format: "svg" | "jpg" | "png" | "pdf";
}

export interface GetRequest {
  err?: string;
  status?: number;
}

export interface GetFileResult extends GetRequest {
  name: string;
  lastModified: string;
  thumbnailURL: string;
  version: string;
  document: Node<"DOCUMENT">;
  components: { [nodeId: string]: Component };
  schemaVersion: number;
  styles: { [styleName: string]: Style };
}

export interface GetFileNodesResult extends GetRequest {
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

export interface GetImageResult extends GetRequest {
  err?: string;
  images: { [nodeId: string]: string | null };
  status?: number;
}
