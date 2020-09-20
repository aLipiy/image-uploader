import * as serviceAccess from "./image-uploader-4d006-firebase-adminsdk-f6a3q-e064548942.json";
import { initializeApp, firestore, credential } from "firebase-admin";
// @ts-ignore
import { v4 } from "uuid";
export interface ImageData {
    date: number;
    ref: string;
    data: string | number | Blob;
}
interface ImageFirestoreData {
    imageArray?: ImageData[];
}

export default class Database {
    get db(): FirebaseFirestore.Firestore | null {
        return this._db;
    }

    private _db: FirebaseFirestore.Firestore | null;

    constructor() {
        this._db = null;
    }

    async init() {
        try {
            initializeApp({
                // @ts-ignore
                credential: credential.cert(serviceAccess),
                databaseURL: process.env.databaseUrl
            });
            this._db = firestore();
            await this.checkCollectionExist();
        } catch (e) {
            throw new Error(e);
        }
    }
    private async checkCollectionExist(): Promise<any> {
        const imageRef = this._db!.collection("images");
        const snapshot: firestore.DocumentSnapshot<ImageFirestoreData> = await imageRef
            .doc("image")
            .get();
        if (snapshot.exists) {
            const data = snapshot.data();
            if (data) {
                const imageArray: ImageData[] | undefined = data.imageArray;
                if (imageArray) {
                    imageArray.map(f => {
                        console.log(f);
                    });
                }
            }
        }
    }
}
