<template>
  <div>
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      style="max-width: 600px"
      @finish="handleSubmit"
    >
      <a-form-item label="Product Name">
        <a-input
          v-model="product.name"
          @change="({ target: { value } }) => handleInputChange('name', value)"
          name="name"
        />
      </a-form-item>
      <!-- 
      <a-form-item label="TreeSelect">
        <a-tree-select :tree-data="treeData" />
      </a-form-item> -->

      <a-form-item label="Category ID">
        <a-input-number
          name="category_id"
          v-model="product.category_id"
          @change="(value) => handleInputChange('category_id', value)"
        />
      </a-form-item>

      <a-form-item label="Picture" name="picture">
        <a-upload
          v-model="fileList"
          list-type="picture-card"
          :customRequest="uploadImage"
          @change="handleFileUpload"
        >
          <div>
            <div style="margin-top: 8px">Upload Picture</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="Button">
        <a-button @click="handleSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, reactive } from "vue";

const product = reactive({
  name: "",
  category_id: 0,
  picture: null,
});

const fileList = ref([]);

const labelCol = {
  style: {
    width: "150px",
  },
};
const wrapperCol = {
  span: 14,
};

const handleInputChange = (fieldName, value) => {
  console.log(fieldName, value);
  product[fieldName] = value;
};

const handleFileUpload = (info) => {
  if (info.file.status !== "uploading") {
    console.log("done");
  }
};

const uploadImage = (options) => {
  const { onSuccess, file } = options;
  setTimeout(() => {
    onSuccess("ok");
  }, 0);

  if (file) {
    product.picture = file;
  }
  console.log(product.picture);
};
const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category_id", Number(product.category_id) || 0);

    formData.append("picture", product.picture);

    console.log(formData);

    const response = await axios.post(
      "http://localhost:5000/product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Product created successfully:", response.data);
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

//I should use this tree to render the categories

// const treeData = reactive([
//   {
//     title: "Light",
//     value: "light",
//     children: [
//       {
//         title: "Bamboo",
//         value: "bamboo",
//       },
//     ],
//   },
// ]);
</script>
