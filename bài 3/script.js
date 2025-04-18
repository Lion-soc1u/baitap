async function searchUsers() {
  // Lấy từ khóa từ ô input, chuyển về chữ thường để tìm kiếm không phân biệt hoa/thường
  const keyword = document.getElementById("search").value.toLowerCase();
  console.log("Từ khóa tìm kiếm:", keyword); // Log ra từ khóa đang tìm

  // Gọi API để lấy danh sách người dùng từ jsonplaceholder
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json(); // Chuyển dữ liệu JSON thành mảng đối tượng

  // Lọc ra những người dùng có tên chứa từ khóa tìm kiếm
  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(keyword)
  );
  console.log("Số lượng người dùng khớp:", filtered.length); // Log ra số lượng kết quả

  // Làm sạch nội dung cũ trong phần hiển thị kết quả
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  // Nếu từ khóa rỗng (chỉ khoảng trắng), dừng lại và không hiển thị gì cả
  if (keyword.trim() === "") return;

  // Duyệt qua các người dùng phù hợp và hiển thị thông tin của họ
  filtered.forEach((user) => {
    console.log(`Tên: ${user.name} | Email: ${user.email}`); // Log từng người dùng được hiển thị

    const div = document.createElement("div"); // Tạo một phần tử div mới
    div.className = "user"; // Gán class CSS
    div.innerHTML = `<strong>${user.name}</strong><br>Email: ${user.email}`; // Gán nội dung HTML
    resultsDiv.appendChild(div); // Thêm phần tử vào phần hiển thị kết quả
  });
}
