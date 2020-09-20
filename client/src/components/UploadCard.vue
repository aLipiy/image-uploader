<template>
  <div class="wrapper">
    <template v-if="!loading">
      <div
        class="card"
        @drop="handleFileInput"
        @dragover="handleDragStart"
        @dragleave="handleDragEnd"
      >
        <div class="done" v-if="loaded">
          <img src="@/assets/check_circle-24px.svg" alt="" />
        </div>
        <div class="card-title">
          <span>{{ title }}</span>
        </div>

        <template v-if="!loaded">
          <div class="card-subtitle">
            <span>File should be Jpeg, Png,...</span>
          </div>
        </template>

        <template v-if="!loaded">
          <div class="drag-and-drop" :class="{ dragging }">
            <img src="@/assets/image.svg" alt="" />
            <span class="help-text">Drag & Drop your image here</span>
          </div>
        </template>

        <template v-else>
          <div class="preview-image">
            <img :src="previewImageString" alt="" />
          </div>
        </template>

        <div class="bottom">
          <template v-if="!loaded">
            <span>Or</span>
            <input
              style="display:none;"
              type="file"
              ref="input"
              accept=".jpeg, .png, .jpg"
              @change="handleFileInput"
            />
            <CommonButton button-text="Choose a file" :action="loadFile" />
          </template>

          <template v-else>
            <div class="copy-board">
              <input
                @focus.prevent.stop
                type="text"
                readonly
                v-model="imageLink"
              />
              <CommonButton button-text="Copy Link" />
            </div>
          </template>
        </div>
      </div>
    </template>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import axios, { AxiosResponse } from "axios";
import Loading from "@/components/Loading.vue";
import CommonButton from "@/components/CommonButton.vue";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
interface UploadResponse {
  message: string;
  uploaded: boolean;
}

export default defineComponent({
  name: "UploadCard",
  components: { Loading, CommonButton },
  setup() {
    const loaded = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const loadingValue = ref<number>(0);
    const dragging = ref<boolean>(false);
    const fileList = ref<Array<File>>([]);
    const input = ref<HTMLInputElement | null>(null);
    const previewImageString = ref<string | ArrayBuffer | null>(null);
    const imageLink = ref("");

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
        const res: AxiosResponse<UploadResponse> = await axios.post(
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

    const handleFileInput = async (e: HTMLInputEvent | DragEvent) => {
      let droppedFiles: FileList | [] = [];
      if (e instanceof DragEvent) {
        if (e.dataTransfer) droppedFiles = e.dataTransfer.files;
      } else {
        if (e.target.files) droppedFiles = e.target.files;
      }
      if (
        ([...droppedFiles][0].type === "image/jpg" ||
          [...droppedFiles][0].type === "image/png" ||
          [...droppedFiles][0].type === "image/jpeg") &&
        droppedFiles.length
      ) {
        checkFilesExist();
        fileList.value.push([...droppedFiles][0]);
        await sendFile();
      }
    };

    const handleDragStart = () => {
      dragging.value = true;
    };
    const handleDragEnd = () => {
      dragging.value = false;
    };

    const title = computed(() => {
      return loaded.value ? "Uploaded Successfully!" : "Upload your image";
    });

    return {
      loadFile,
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
      loadingValue,
      title,
      imageLink
    };
  }
});
</script>

<style scoped lang="scss">
.card {
  width: var(--loaderwidth);
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
    }
    .copy-board {
      position: relative;
      width: 100%;
      height: 34px;
      input {
        user-select: none;
        pointer-events: none;
        position: absolute;
        top: 0;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-family: "Poppins", sans-serif;
        font-size: 8px;
        line-height: 12px;
        letter-spacing: -0.035em;
        color: #4f4f4f;
        padding: 11px 97px 11px 13px;
        background: #f6f8fb;
        width: calc(var(--loaderwidth) - 32px * 2);
        height: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &:focus {
          outline: none;
        }
      }
      .btn {
        position: absolute;
        top: 2px;
        bottom: 2px;
        right: 2px;
        width: 74px;
        font-size: 8px;
        letter-spacing: -0.035em;
        margin-top: 0;
        height: 30px;
      }
    }
  }
  .preview-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 224px;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 30px;
    img {
      object-fit: cover;
    }
  }
  .done {
    display: flex;
    justify-content: center;
    margin-bottom: 11px;
    img {
      width: 42px;
      height: 42px;
    }
  }
}
</style>
