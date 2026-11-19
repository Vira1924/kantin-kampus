/**
 * script.js - Logika Autentikasi & Interaktivitas Login Kantin Kampus
 * Pemrograman Web
 */

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("togglePassword");
    const eyeIcon = document.getElementById("eyeIcon");
    const alertBox = document.getElementById("loginAlert");
    const btnQuickFill = document.getElementById("btnQuickFill");
    const btnLogin = document.getElementById("btnLogin");
    const btnHelp = document.getElementById("btnHelp");

    // Fungsi menampilkan notifikasi alert yang elegan di halaman
    function showAlert(message, type = "error") {
        if (!alertBox) return;
        alertBox.className = `alert-box alert-${type}`;
        
        const icon = type === "success" 
            ? '<i class="fa-solid fa-circle-check"></i>' 
            : '<i class="fa-solid fa-triangle-exclamation"></i>';
            
        alertBox.innerHTML = `${icon} <span>${message}</span>`;
        alertBox.style.display = "flex";

        // Animasi shake jika error
        if (type === "error") {
            alertBox.classList.add("shake-animation");
            setTimeout(() => alertBox.classList.remove("shake-animation"), 500);
        }
    }

    // Toggle Lihat/Sembunyikan Password
    if (togglePasswordBtn && passwordInput && eyeIcon) {
        togglePasswordBtn.addEventListener("click", function () {
            const isPassword = passwordInput.getAttribute("type") === "password";
            passwordInput.setAttribute("type", isPassword ? "text" : "password");
            eyeIcon.className = isPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
        });
    }

    // Tombol Cepat Isi Akun Demo (Memudahkan pengujian & dosen)
    if (btnQuickFill) {
        btnQuickFill.addEventListener("click", function () {
            usernameInput.value = "vira";
            passwordInput.value = "12345";
            showAlert("Kredensial demo terisi otomatis! Silakan klik tombol Masuk.", "success");
            usernameInput.focus();
        });
    }

    // Tombol Bantuan
    if (btnHelp) {
        btnHelp.addEventListener("click", function () {
            showAlert("Gunakan Username: <strong>vira</strong> dan Password: <strong>12345</strong> untuk masuk.", "success");
        });
    }

    // Penanganan Submit Form Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Validasi input kosong
            if (!username || !password) {
                showAlert("Username dan Password wajib diisi!", "error");
                if (!username) usernameInput.focus();
                else passwordInput.focus();
                return;
            }

            // Validasi kredensial (Username: vira, Password: 12345)
            if (username === "vira" && password === "12345") {
                // Simpan status login ke localStorage
                const userData = {
                    username: username,
                    displayName: "Vira (Mahasiswa)",
                    avatar: "👩‍🎓",
                    loginTime: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
                };
                localStorage.setItem("kantinUser", JSON.stringify(userData));

                // Efek loading pada tombol
                btnLogin.disabled = true;
                btnLogin.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Memverifikasi...</span>';
                showAlert("Login berhasil! Mengalihkan ke menu kantin...", "success");

                // Redirect ke halaman menu
                setTimeout(function () {
                    window.location.href = "detail.html";
                }, 800);

            } else {
                showAlert("Username atau password salah! Periksa kembali akun Anda.", "error");
                passwordInput.value = "";
                passwordInput.focus();
            }
        });
    }

    // Jika sudah ada session login, auto-fill username untuk kenyamanan
    try {
        const savedUser = JSON.parse(localStorage.getItem("kantinUser"));
        if (savedUser && savedUser.username && usernameInput) {
            usernameInput.value = savedUser.username;
        }
    } catch (e) {
        console.warn("Gagal membaca session:", e);
    }
});
