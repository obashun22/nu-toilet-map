import { PostToilet, Toilet } from "../types/toilet";
import { app } from "../firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  getDoc,
  collection,
  getFirestore,
  doc,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage(app);
const firestore = getFirestore(app);

// APIのエンドポイント一覧
// GET /toilets
// GET /toilets/:id
// POST /toilets
// DELETE /toilets/:id
// POST /images

export class ApiClient {
  async getToiletList(): Promise<Toilet[]> {
    // collectionから全件取得
    const toiletsCollection = collection(firestore, "toilets");
    const querySnapshot = await getDocs(toiletsCollection);
    const toilets = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      } as Toilet;
    });
    return toilets;
  }

  async getToilet(id: string): Promise<Toilet> {
    // collectionからidを検索
    const toiletsCollection = collection(firestore, "toilets");
    const docRef = doc(toiletsCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Toilet;
    } else {
      console.log("No such document!");
      throw new Error("No such document!");
    }
  }

  async postToilet(toilet: PostToilet): Promise<Toilet> {
    // 画像アップロードの後に、その他のデータをドキュメントとしてアップロード
    const toiletsCollection = collection(firestore, "toilets");

    // Firestoreへの保存
    const docData = {
      name: toilet.name,
      position: {
        lat: toilet.position.lat,
        lng: toilet.position.lng,
      },
      images: toilet.images,
      rate: toilet.rate,
      comment: toilet.comment,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(toiletsCollection, docData);

    // 返り値の生成
    const createdDoc = await getDoc(docRef);
    return {
      id: createdDoc.id,
      ...createdDoc.data(),
    } as Toilet;
  }

  async postImage(image: File): Promise<string> {
    const fileName = uuidv4();
    const fileRef = ref(storage, fileName);
    // storageに画像をアップロード
    try {
      // storageに画像をアップロード
      await uploadBytes(fileRef, image);
      console.log("Uploaded a blob or file!");
      // storageから画像のURLを取得
      const url = await getDownloadURL(fileRef);
      console.log(url);
      return url;
    } catch (error) {
      console.log(error);
      throw error; // エラーを再スローする
    }
  }

  async deleteToilet(id: string): Promise<void> {
    // collectionからidを検索して削除
    const toiletsCollection = collection(firestore, "toilets");
    const docRef = doc(toiletsCollection, id);
    await deleteDoc(docRef);
  }
}
