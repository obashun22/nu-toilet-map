import axios from "axios";
import { PostToilet, Toilet } from "../types/toilet";

// APIのエンドポイント一覧
// GET /toilets
// GET /toilets/:id
// POST /toilets
// DELETE /toilets/:id
// POST /images

export class ApiClient {
  async getToiletList(): Promise<Toilet[]> {
    const res = await axios.get<Toilet[]>(
      `${process.env.REACT_APP_API_BASE_URL}/toilets`
    );
    return res.data;
  }

  async getToilet(id: number): Promise<Toilet> {
    const res = await axios.get<Toilet>(
      `${process.env.REACT_APP_API_BASE_URL}/toilets/${id}`
    );
    return res.data;
  }

  async postToilet(toilet: PostToilet): Promise<Toilet> {
    const formData = new FormData();
    // 画像のアップロード
    let images: string[] = [];
    for (const image of toilet.images) {
      const url = await this.postImage(image);
      images.push(url);
    }
    formData.append("images", JSON.stringify(images));
    // その他のデータのアップロード
    Object.entries(toilet).forEach(([key, value]) => {
      if (key === "images") {
        return; // 既にappend済み
      } else if (key === "position" || "rate") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });
    const res = await axios.post<Toilet>(
      `${process.env.REACT_APP_API_BASE_URL}/toilets`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  }

  async postImage(image: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", image);
    const res = await axios.post<string>(
      `${process.env.REACT_APP_API_BASE_URL}/images`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  }

  async deleteToilet(id: number): Promise<void> {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/toilets/${id}`);
  }
}
