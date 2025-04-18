const formData = new FormData();
const fileInput = document.getElementById("image-file");

if (fileInput.files.length > 0) {
  formData.append("image", fileInput.files[0]);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);

  xhr.onload = function () {
    if (xhr.status === 201) {
      const response = JSON.parse(xhr.responseText);
      const imageUrl = response.url;

      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      document.getElementById("image-container").appendChild(imgElement);
    }
  };

  xhr.send(formData);
}
