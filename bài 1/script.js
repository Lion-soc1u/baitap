// Hàm chính xử lý việc lấy và gửi dữ liệu
async function layVaGuiDuLieu() {
  try {
    // Gửi GET đến API để lấy danh sách người dùng
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Kiểm tra nếu server phản hồi lỗi
    console.log("📦 response.ok:", response.ok); // true hoặc false
    console.log("📥 Mã trạng thái:", response.status);

    if (!response.ok) {
      console.error("❌ Lỗi phản hồi từ server:", response.status);
      alert("Không thể lấy dữ liệu từ server. Mã lỗi: " + response.status);
      return;
    }

    const data = await response.json();
    console.log("✅ Dữ liệu nhận được:", data);

    const listContainer = document.getElementById("user-list");
    listContainer.innerHTML = ""; // Xóa dữ liệu cũ

    // Tạo bảng để hiển thị danh sách người dùng
    const table = document.createElement("table");
    //table.border = "1"; dùng cũng được nhưng k khuyến khích
table.style.border = "1px solid black";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.textAlign = "left";

    // Tạo hàng tiêu đề
    const headerRow = document.createElement("tr");
    ["STT", "Họ và tên", "Email"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      th.style.padding = "8px";
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Tạo các hàng dữ liệu người dùng
    data.forEach((user, index) => {
      const row = document.createElement("tr");

      const sttCell = document.createElement("td");
      sttCell.textContent = index + 1;
      sttCell.style.padding = "6px";

      const nameCell = document.createElement("td");
      nameCell.textContent = user.name;
      nameCell.style.padding = "6px";

      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      emailCell.style.padding = "6px";

      row.appendChild(sttCell); // gắn ô stt td vào tr là ô sô thứ tự
      row.appendChild(nameCell);// gắn ô chứa tên dùng td vào hàng
      row.appendChild(emailCell);// gắn ô chứa email vàog hàng

      table.appendChild(row);// gắn hàng vừa tạo vào bảng
    });

    // Gắn bảng vào DOM
    listContainer.appendChild(table);

    // Gửi lại dữ liệu vừa nhận được bằng POST
    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const postResult = await postResponse.json();
    console.log("📤 Kết quả gửi POST:", postResult);
    alert("Dữ liệu đã được gửi thành công!");
  } catch (error) {
    console.error("❌ Lỗi:", error);
    alert("Đã xảy ra lỗi khi xử lý dữ liệu.");
  }
}
