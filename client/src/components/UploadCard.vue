<template>
  <div class="wrapper">
    <div
      v-if="!loading"
      class="card"
      @drop="handleDropFileInput"
      @dragover="handleDragStart"
      @dragleave="handleDragEnd"
    >
      <div class="card-title"><span>Upload your image</span></div>
      <div class="card-subtitle">
        <span>File should be Jpeg, Png,...</span>
      </div>

      <div v-if="!loaded" class="drag-and-drop" :class="{ dragging }">
        <img src="@/assets/image.svg" alt="" />
        <span class="help-text">Drag & Drop your image here</span>
      </div>

      <div v-else class="preview-image">
        <img :src="previewImageString" alt="" />
      </div>

      <div class="bottom">
        <span>Or</span>
        <input
          style="display:none;"
          type="file"
          ref="input"
          accept=".jpeg, .png, .jpg"
          @change="handleFileInput"
        />
        <button class="btn" @click="loadFile">Choose a file</button>
      </div>
    </div>
    <Loading v-else :loading-value="loadingValue" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import axios, { AxiosResponse } from "axios";
import Loading from "@/components/Loading.vue";

const apiCall = axios.create({
  baseURL: "http://localhost:8080"
});

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
interface UploadResponse {
  message: string;
  uploaded: boolean;
}

export default defineComponent({
  name: "UploadCard",
  components: { Loading },
  setup() {
    const loaded = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const loadingValue = ref<number>(0);
    const dragging = ref<boolean>(false);
    const fileList = ref<Array<File>>([]);
    const input = ref<HTMLInputElement | null>(null);
    const previewImageString = ref<string | ArrayBuffer | null>(null);

    const setPreviewImage = () => {
      const reader = new FileReader();
      reader.addEventListener("loadend", () => {
        previewImageString.value = reader.result;
      });
      reader.readAsDataURL(fileList.value[0]);
    };

    const sendFile = async () => {
      try {
        const fileSize = fileList.value[0].size;
        const formData = new FormData();
        fileList.value.forEach(f =>
          formData.append("image", f, f.name.split(" ").join("-"))
        );
        loading.value = true;
        const res: AxiosResponse<UploadResponse> = await apiCall.post(
          "/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent =>
              (loadingValue.value = Math.floor(
                (progressEvent.loaded / fileSize) * 100
              ))
          }
        );
        setPreviewImage();
        loading.value = false;
        loadingValue.value = 0;
        fileList.value = [];
        loaded.value = true;
        console.log(res.data);
      } catch (error) {
        loaded.value = false;
        console.error(error);
      }
    };

    const checkFilesExist = () => {
      if (fileList.value.length) {
        fileList.value = [];
        previewImageString.value = "";
      }
    };

    const loadFile = () => {
      if (input.value) {
        input.value.click();
      }
    };
    const handleDropFileInput = async (e: DragEvent) => {
      checkFilesExist();
      dragging.value = false;
      if (e.dataTransfer) {
        const droppedFiled = e.dataTransfer.files;
        if (
          [...droppedFiled][0].type === "image/jpg" ||
          [...droppedFiled][0].type === "image/png" ||
          [...droppedFiled][0].type === "image/jpeg"
        ) {
          fileList.value.push([...droppedFiled][0]);
        }
        await sendFile();
      }
    };
    const handleFileInput = async (e: HTMLInputEvent) => {
      checkFilesExist();
      const files: FileList | null = e.target.files;
      if (files && files.length) {
        [...files].forEach((f: File) => {
          fileList.value.push(f);
        });
        await sendFile();
      }
    };
    const handleDragStart = () => {
      dragging.value = true;
    };
    const handleDragEnd = () => {
      dragging.value = false;
    };

    return {
      loadFile,
      handleDropFileInput,
      handleFileInput,
      handleDragStart,
      handleDragEnd,
      sendFile,
      input,
      fileList,
      dragging,
      loaded,
      previewImageString,
      loading,
      loadingValue
    };
  }
});
</script>

<style scoped lang="scss">
.card {
  width: 402px;
  height: 469px;
  background: #fafafb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 36px 32px;
  &-title,
  &-subtitle {
    text-align: center;
    span {
      letter-spacing: -0.035em;
    }
  }
  &-title &-title {
    margin-bottom: 16px;
    span {
      line-height: 27px;
      color: #4f4f4f;
    }
  }
  &-subtitle {
    span {
      font-size: 10px;
      line-height: 15px;
      color: #828282;
    }
  }
  .drag-and-drop {
    width: 100%;
    border: 1px dashed #bdbdbd;
    border-radius: 12px;
    margin-top: 30px;
    padding-top: 36px;
    padding-bottom: 40px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: all 0.2s ease-in-out;
    transform: scale(1);
    &.dragging {
      border: 1px dashed #97bef4;
      background: #f6f8fb;
      transition: all 0.2s ease-in;
      cursor: move;
      transform: scale(1.02);
    }
    img {
      margin-bottom: 38px;
    }
    .help-text {
      font-size: 12px;
      line-height: 18px;
      letter-spacing: -0.035em;
      color: #bdbdbd;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 19px;
    span {
      text-align: center;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      letter-spacing: -0.035em;
      color: #bdbdbd;
    }
    .btn {
      max-width: 110px;
      margin-top: 22px;
      background: #2f80ed;
      border-radius: 8px;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      letter-spacing: -0.035em;
      color: #ffffff;
      padding: 8px 16px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .preview-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 224px;
    img {
      object-fit: cover;
      overflow: hidden;
    }
  }
}
</style>
