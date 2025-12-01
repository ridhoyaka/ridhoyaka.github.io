document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(btn.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});
document.getElementById("daftarForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const notif = document.getElementById("notif");
  notif.style.color = "green";
  notif.textContent = "Pendaftaran berhasil! Terima kasih, " + nama;
  this.reset();
});
