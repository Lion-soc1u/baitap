const form = document.getElementById("contact-form");
const responseBox = document.getElementById("response");
console.log(" Script đã được load hay chưa ");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Ngăn reload trang
  console.log("Form đã được submit hay chưa");

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };
  console.log(" Dữ liệu thu được từ form:", formData);

  try {
    console.log(" Đang gửi yêu cầu POST đến API...");
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log("Đã nhận được phản hồi từ server");
    console.log(" Trạng thái:", res.status);
    console.log(" Headers:", [...res.headers.entries()]); // dùng Spread (...) để biến Interator thành mảng
// res là đối thương reponse trả về từ fetch()
    const data = await res.json();
    console.log(" Nội dung phản hồi JSON:", data);

    responseBox.textContent =
      "📦 Phản hồi từ server:\n" + JSON.stringify(data, null, 2);
  } catch (error) {
    responseBox.textContent = "❌ Đã xảy ra lỗi: " + error;
  }
});
