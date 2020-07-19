import qs from "qs";
import fetch from "node-fetch";
import {
  GetFileResult,
  GetFileNodesOptions,
  GetFileNodesResult,
  GetImageOptions,
  GetImageResult
} from "./figma.client.types";

const qsOptions: qs.IStringifyOptions = {
  arrayFormat: "comma"
};

export class FigmaClient {
  private readonly BASE_URL = "https://api.figma.com/v1";
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request<T = any>(url: string): Promise<T> {
    const response = await fetch(`${this.BASE_URL}/${url}`, {
      headers: {
        "X-Figma-Token": this.accessToken,
        "Content-Type": "application/json"
      }
    });

    const data: T = await response.json();

    return data;
  }

  public async getFile(fileId: string) {
    const data = await this.request<GetFileResult>(`files/${fileId}`);
    return data;
  }

  public async getFileNodes(fileId: string, options: GetFileNodesOptions) {
    const data = await this.request<GetFileNodesResult>(
      `files/${fileId}/nodes?${qs.stringify(options, qsOptions)}`
    );
    return data;
  }

  public async getImage(fileId: string, options: GetImageOptions) {
    const data = await this.request<GetImageResult>(
      `images/${fileId}?${qs.stringify(options, qsOptions)}`
    );
    return data;
  }
}
