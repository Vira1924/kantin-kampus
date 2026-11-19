/**
 * api.js - Logika Pengambilan Data API, State Management, Keranjang, & Interaksi Menu
 * Tugas Pemrograman Web - Kantin Kampus
 */

// Konfigurasi Endpoint API
const API_ONLINE_URL = "https://dummyjson.com/recipes?limit=15";
const API_LOCAL_URL = "menu.json";

// Data Cadangan Internal (Fail-safe jika browser membuka via file:// tanpa webserver atau tanpa internet)
const FALLBACK_CAMPUS_MENU = [
    {
        id: "fb_1",
        nama: "Ayam Geprek Sambal Korek",
        kategori: "Makanan",
        cuisine: "Indonesia",
        harga: 15000,
        rating: 4.9,
        reviewCount: 128,
        gambar: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Ayam krispi renyah digeprek dengan sambal korek bawang pedas nampol, disajikan hangat.",
        prepTime: "10 Menit",
        calories: 480,
        ingredients: ["Ayam crispy gurih", "Cabai rawit merah segar", "Bawang putih", "Minyak panas", "Nasi putih hangat"]
    },
    {
        id: "fb_2",
        nama: "Mie Ayam Bakso Spesial",
        kategori: "Makanan",
        cuisine: "Indonesia",
        harga: 13000,
        rating: 4.8,
        reviewCount: 95,
        gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Mie kenyal dengan potongan ayam bumbu kecap manis gurih, pangsit renyah, dan bakso sapi.",
        prepTime: "8 Menit",
        calories: 420,
        ingredients: ["Mie basah kenyal", "Daging ayam kecap", "Bakso sapi asli", "Sawi hijau", "Pangsit renyah"]
    },
    {
        id: "fb_3",
        nama: "Nasi Goreng Spesial Kampus",
        kategori: "Makanan",
        cuisine: "Indonesia",
        harga: 14000,
        rating: 4.7,
        reviewCount: 110,
        gambar: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Nasi goreng aroma smokey wajan kantin dengan suwiran ayam, telur mata sapi, dan kerupuk.",
        prepTime: "12 Menit",
        calories: 510,
        ingredients: ["Nasi putih pulen", "Telur ayam mata sapi", "Suwiran ayam", "Kecap manis pilihan", "Acar segar & kerupuk"]
    },
    {
        id: "fb_4",
        nama: "Nasi Kuning Komplit",
        kategori: "Makanan",
        cuisine: "Indonesia",
        harga: 12000,
        rating: 4.8,
        reviewCount: 74,
        gambar: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Nasi kuning wangi gurih santan dengan lauk orek tempe, bihun kecap, telur balado, dan sambal.",
        prepTime: "5 Menit",
        calories: 450,
        ingredients: ["Nasi kuning rempah gurih", "Orek tempe manis", "Telur balado", "Bihun goreng", "Mentimun"]
    },
    {
        id: "fb_5",
        nama: "Es Teh Manis Jumbo",
        kategori: "Minuman",
        cuisine: "Indonesia",
        harga: 4000,
        rating: 4.9,
        reviewCount: 240,
        gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Teh seduh melati wangi racikan khas kantin, dingin menyegarkan di gelas ukuran jumbo.",
        prepTime: "3 Menit",
        calories: 90,
        ingredients: ["Teh melati pilihan", "Gula tebu murni", "Es batu kristal higienis", "Air matang"]
    },
    {
        id: "fb_6",
        nama: "Es Jeruk Peras Segar",
        kategori: "Minuman",
        cuisine: "Indonesia",
        harga: 6000,
        rating: 4.8,
        reviewCount: 89,
        gambar: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Perasan asli jeruk segar kaya vitamin C dengan manis yang pas dan sensasi dingin menyegarkan.",
        prepTime: "4 Menit",
        calories: 110,
        ingredients: ["Jeruk peras manis", "Gula cair murni", "Es kristal", "Air mineral"]
    },
    {
        id: "fb_7",
        nama: "Kopi Susu Gula Aren",
        kategori: "Minuman",
        cuisine: "Indonesia",
        harga: 10000,
        rating: 4.9,
        reviewCount: 165,
        gambar: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Espresso kopi robusta berpadu dengan susu fresh milk creamy dan sirup gula aren organik.",
        prepTime: "5 Menit",
        calories: 160,
        ingredients: ["Espresso robusta", "Susu segar UHT", "Gula aren cair asli", "Es batu"]
    },
    {
        id: "fb_8",
        nama: "Air Mineral Dingin 600ml",
        kategori: "Minuman",
        cuisine: "Indonesia",
        harga: 3500,
        rating: 4.9,
        reviewCount: 190,
        gambar: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Air mineral murni dalam kemasan botol higienis dan sejuk untuk pelepas dahaga saat kuliah.",
        prepTime: "1 Menit",
        calories: 0,
        ingredients: ["Air mineral alami pegunungan"]
    },
    {
        id: "fb_9",
        nama: "Cireng Crispy Bumbu Rujak",
        kategori: "Snack",
        cuisine: "Indonesia",
        harga: 8000,
        rating: 4.8,
        reviewCount: 62,
        gambar: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Cireng renyah di luar kenyal lembut di dalam, dicocol sambal rujak asam manis pedas.",
        prepTime: "7 Menit",
        calories: 230,
        ingredients: ["Tepung tapioka bumbu", "Bawang putih & daun bawang", "Sambal rujak gula merah", "Cabai rawit"]
    },
    {
        id: "fb_10",
        nama: "Kentang Goreng Keju Mayo",
        kategori: "Snack",
        cuisine: "Barat",
        harga: 10000,
        rating: 4.7,
        reviewCount: 78,
        gambar: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
        deskripsi: "French fries kentang renyah ditaburi bumbu keju gurih serta saus mayonaise lezat.",
        prepTime: "6 Menit",
        calories: 290,
        ingredients: ["Kentang potong pilihan", "Bumbu tabur keju gurih", "Saus mayonaise", "Saus tomat"]
    },
    {
        id: "fb_11",
        nama: "Pisang Coklat Lumer Crispy",
        kategori: "Snack",
        cuisine: "Indonesia",
        harga: 9000,
        rating: 4.9,
        reviewCount: 115,
        gambar: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Pisang raja manis berbalut kulit lumpia krispi dengan isian coklat lumer yang meleleh di mulut.",
        prepTime: "8 Menit",
        calories: 260,
        ingredients: ["Pisang raja manis", "Pasta coklat lumer", "Kulit lumpia renyah", "Gula halus"]
    },
    {
        id: "fb_12",
        nama: "Risol Mayo Beef Telur",
        kategori: "Snack",
        cuisine: "Indonesia",
        harga: 9000,
        rating: 4.8,
        reviewCount: 85,
        gambar: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80",
        deskripsi: "Risol kulit lembut dibalut tepung panir krispi berisikan smoked beef, telur rebus, dan mayo gurih.",
        prepTime: "5 Menit",
        calories: 280,
        ingredients: ["Kulit risoles lembut", "Smoked beef", "Telur rebus", "Saus mayonaise gurih", "Tepung panir"]
    }
];

// State Aplikasi
let currentSource = "api"; // 'api' atau 'local'
let allMenuItems = [];
let currentCategory = "all";
let searchQuery = "";
let currentSort = "default";
let cart = [];

// DOM Elements
const containerMenu = document.getElementById("daftarMenu");
const searchInput = document.getElementById("searchInput");
const btnClearSearch = document.getElementById("btnClearSearch");
const sortSelect = document.getElementById("sortSelect");
const sectionTitle = document.getElementById("sectionTitle");
const sectionSubtitle = document.getElementById("sectionSubtitle");
const resultCountBadge = document.getElementById("resultCountBadge");

const btnSourceApi = document.getElementById("btnSourceApi");
const btnSourceLocal = document.getElementById("btnSourceLocal");

// Badge Hitungan Kategori
const countAllEl = document.getElementById("countAll");
const countMakananEl = document.getElementById("countMakanan");
const countMinumanEl = document.getElementById("countMinuman");
const countSnackEl = document.getElementById("countSnack");

// Modal Elements
const modalDetail = document.getElementById("modalDetail");
const modalDetailContent = document.getElementById("modalDetailContent");
const btnCloseDetailModal = document.getElementById("btnCloseDetailModal");

const modalCart = document.getElementById("modalCart");
const btnOpenCart = document.getElementById("btnOpenCart");
const btnCloseCartModal = document.getElementById("btnCloseCartModal");
const cartCountBadge = document.getElementById("cartCount");
const cartItemsList = document.getElementById("cartItemsList");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartTotalEl = document.getElementById("cartTotal");
const btnClearCart = document.getElementById("btnClearCart");
const btnCheckout = document.getElementById("btnCheckout");
const orderNoteInput = document.getElementById("orderNote");

const modalReceipt = document.getElementById("modalReceipt");
const receiptDetails = document.getElementById("receiptDetails");
const btnCloseReceipt = document.getElementById("btnCloseReceipt");

const toastContainer = document.getElementById("toastContainer");
const userGreetingEl = document.getElementById("userGreeting");
const userAvatarEl = document.getElementById("userAvatar");
const btnLogout = document.getElementById("btnLogout");

// ==========================================
// 1. INISIALISASI & AUTENTIKASI PENGGUNA
// ==========================================
function initUserSession() {
    try {
        const savedUser = JSON.parse(localStorage.getItem("kantinUser"));
        if (savedUser && savedUser.username) {
            if (userGreetingEl) userGreetingEl.textContent = savedUser.displayName || savedUser.username;
            if (userAvatarEl && savedUser.avatar) userAvatarEl.textContent = savedUser.avatar;
        } else {
            // Jika belum login, kita beri sambutan default (atau bisa redirect jika diperlukan)
            if (userGreetingEl) userGreetingEl.textContent = "Pengunjung Kampus";
        }
    } catch (e) {
        console.warn("Gagal inisialisasi session user:", e);
    }
}

// Event Logout
if (btnLogout) {
    btnLogout.addEventListener("click", function () {
        if (confirm("Apakah Anda yakin ingin logout dari Kantin Kampus?")) {
            localStorage.removeItem("kantinUser");
            showToast("Anda telah berhasil logout.", "info");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 600);
        }
    });
}

// Inisialisasi Keranjang dari LocalStorage
function initCartFromStorage() {
    try {
        const savedCart = localStorage.getItem("kantinCart");
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (e) {
        cart = [];
    }
    updateCartUI();
}

function saveCartToStorage() {
    try {
        localStorage.setItem("kantinCart", JSON.stringify(cart));
    } catch (e) {
        console.warn("Gagal menyimpan keranjang:", e);
    }
    updateCartUI();
}

// ==========================================
// 2. FUNGSI TOAST NOTIFIKASI ELEGAN
// ==========================================
function showToast(message, type = "success") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;

    let icon = '<i class="fa-solid fa-circle-check"></i>';
    if (type === "warning") icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    if (type === "info") icon = '<i class="fa-solid fa-circle-info"></i>';

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${message}</div>
    `;

    toastContainer.appendChild(toast);

    // Animasi keluar setelah 3.2 detik
    setTimeout(() => {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 400);
    }, 3200);
}

// ==========================================
// 3. FUNGSI PENGAMBILAN DATA (API & LOCAL)
// ==========================================

// Normalisasi data dari DummyJSON Recipes agar konsisten dengan struktur data kampus
function normalisasiDataApi(recipes) {
    return recipes.map((recipe, index) => {
        // Logika penentuan kategori berdasarkan mealType dan tags dari API
        const mealTypes = (recipe.mealType || []).map(m => m.toLowerCase());
        const tags = (recipe.tags || []).map(t => t.toLowerCase());

        let kategori = "Makanan";
        if (mealTypes.includes("beverage") || tags.some(t => t.includes("drink") || t.includes("smoothie") || t.includes("tea"))) {
            kategori = "Minuman";
        } else if (mealTypes.includes("snack") || mealTypes.includes("dessert") || mealTypes.includes("appetizer") || tags.some(t => t.includes("cookie") || t.includes("snack"))) {
            kategori = "Snack";
        }

        // Harga contoh mahasiswa dalam Rupiah
        const hargaMahasiswa = 12000 + (index * 1500);

        return {
            id: `api_${recipe.id}`,
            nama: recipe.name,
            kategori: kategori,
            cuisine: recipe.cuisine || "Internasional",
            harga: hargaMahasiswa,
            rating: Number(recipe.rating) || 4.5,
            reviewCount: recipe.reviewCount || (30 + index * 5),
            gambar: recipe.image,
            deskripsi: `Sajian lezat hidangan ${recipe.name} khas ${recipe.cuisine || "pilihan"}, disajikan hangat dan bergizi.`,
            prepTime: `${recipe.prepTimeMinutes || 15} Menit`,
            calories: recipe.caloriesPerServing || 350,
            ingredients: recipe.ingredients || ["Bahan pilihan segar", "Bumbu rempah alami"],
            source: "API DummyJSON"
        };
    });
}

// Mengambil Data dari API Online DummyJSON
async function muatDariApiOnline() {
    if (!containerMenu) return;

    containerMenu.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Sedang mengambil data menu dari <strong>DummyJSON Recipes API</strong>...</p>
        </div>
    `;

    try {
        const response = await fetch(API_ONLINE_URL);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.recipes || data.recipes.length === 0) {
            throw new Error("Data resep API kosong");
        }

        allMenuItems = normalisasiDataApi(data.recipes);
        showToast(`Berhasil memuat ${allMenuItems.length} menu dari DummyJSON API!`, "success");
        renderMenu();

    } catch (error) {
        console.warn("Gagal mengambil data API Online, beralih ke menu lokal:", error);
        showToast("Koneksi API online gagal. Otomatis beralih ke Menu Kantin Lokal.", "warning");
        muatDariMenuLokal();
    }
}

// Mengambil Data dari file JSON Lokal (menu.json) dengan fallback cadangan
async function muatDariMenuLokal() {
    if (!containerMenu) return;

    containerMenu.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Memuat menu lokal kantin kampus (menu.json)...</p>
        </div>
    `;

    try {
        const response = await fetch(API_LOCAL_URL);
        if (!response.ok) {
            throw new Error(`Gagal fetch menu.json (Status ${response.status})`);
        }

        const data = await response.json();
        allMenuItems = data.map((item, idx) => ({
            id: item.id || `local_${idx + 1}`,
            nama: item.nama,
            kategori: item.kategori || "Makanan",
            cuisine: item.cuisine || "Indonesia",
            harga: typeof item.harga === "number" ? item.harga : parseInt(String(item.harga).replace(/\D/g, "")) || 10000,
            rating: item.rating || 4.8,
            reviewCount: item.reviewCount || 80,
            gambar: item.gambar || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
            deskripsi: item.deskripsi || "Menu favorit mahasiswa kantin kampus.",
            prepTime: item.prepTime || "10 Menit",
            calories: item.calories || 380,
            ingredients: item.ingredients || ["Bahan segar berkualitas", "Rempah asli pilihan"],
            source: "menu.json"
        }));

        showToast(`Berhasil memuat ${allMenuItems.length} menu dari menu.json!`, "success");
        renderMenu();

    } catch (err) {
        console.warn("Fetch menu.json gagal, memakai data fail-safe terintegrasi:", err);
        allMenuItems = FALLBACK_CAMPUS_MENU;
        showToast("Memuat 12 Menu Khas Kantin Kampus (Cadangan Siap Saji)", "info");
        renderMenu();
    }
}

// Format Rupiah
function formatRupiah(angka) {
    return "Rp " + Number(angka).toLocaleString("id-ID");
}

// ==========================================
// 4. RENDERING MENU & FILTER LOGIC
// ==========================================
function hitungJumlahKategori() {
    const totalAll = allMenuItems.length;
    const totalMakanan = allMenuItems.filter(item => item.kategori === "Makanan").length;
    const totalMinuman = allMenuItems.filter(item => item.kategori === "Minuman").length;
    const totalSnack = allMenuItems.filter(item => item.kategori === "Snack").length;

    if (countAllEl) countAllEl.textContent = totalAll;
    if (countMakananEl) countMakananEl.textContent = totalMakanan;
    if (countMinumanEl) countMinumanEl.textContent = totalMinuman;
    if (countSnackEl) countSnackEl.textContent = totalSnack;
}

function filterDanUrutkanMenu() {
    let list = [...allMenuItems];

    // Filter Kategori
    if (currentCategory !== "all") {
        list = list.filter(item => item.kategori === currentCategory);
    }

    // Filter Pencarian (Case-insensitive)
    if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        list = list.filter(item => 
            item.nama.toLowerCase().includes(query) ||
            item.kategori.toLowerCase().includes(query) ||
            item.cuisine.toLowerCase().includes(query) ||
            item.deskripsi.toLowerCase().includes(query)
        );
    }

    // Pengurutan (Sorting)
    if (currentSort === "price-low") {
        list.sort((a, b) => a.harga - b.harga);
    } else if (currentSort === "price-high") {
        list.sort((a, b) => b.harga - a.harga);
    } else if (currentSort === "rating") {
        list.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === "name-asc") {
        list.sort((a, b) => a.nama.localeCompare(b.nama));
    }

    return list;
}

function renderMenu() {
    if (!containerMenu) return;

    hitungJumlahKategori();
    const items = filterDanUrutkanMenu();

    // Update Label Result Count
    if (resultCountBadge) {
        resultCountBadge.textContent = `${items.length} menu ditemukan`;
    }

    // Update Judul Section
    if (sectionTitle) {
        if (searchQuery.trim() !== "") {
            sectionTitle.textContent = `Hasil Pencarian: "${searchQuery}"`;
            if (sectionSubtitle) sectionSubtitle.textContent = `Ditemukan ${items.length} menu yang cocok dengan kata kunci Anda.`;
        } else if (currentCategory === "Makanan") {
            sectionTitle.textContent = "🍗 Menu Makanan Berat & Bergizi";
            if (sectionSubtitle) sectionSubtitle.textContent = "Pilihan santapan lezat untuk mengisi energi kuliah Anda.";
        } else if (currentCategory === "Minuman") {
            sectionTitle.textContent = "🥤 Menu Minuman Segar & Dingin";
            if (sectionSubtitle) sectionSubtitle.textContent = "Pelepas dahaga yang manis, sejuk, dan menyegarkan.";
        } else if (currentCategory === "Snack") {
            sectionTitle.textContent = "🍪 Menu Snack & Cemilan Kampus";
            if (sectionSubtitle) sectionSubtitle.textContent = "Cemilan renyah untuk menemani waktu santai atau nugas.";
        } else {
            sectionTitle.textContent = "🍽️ Semua Menu Kantin Kampus";
            if (sectionSubtitle) sectionSubtitle.textContent = "Jelajahi seluruh aneka santapan lezat dengan harga bersahabat.";
        }
    }

    // Jika kosong
    if (items.length === 0) {
        containerMenu.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fa-solid fa-bowl-food"></i></div>
                <h3>Menu Tidak Ditemukan</h3>
                <p>Tidak ada menu yang sesuai dengan pencarian "<strong>${searchQuery}</strong>". Silakan coba kata kunci lain atau pilih kategori Semua.</p>
                <button type="button" class="btn-submit" id="btnResetSearch">
                    <i class="fa-solid fa-rotate-left"></i> Tampilkan Semua Menu
                </button>
            </div>
        `;

        const btnReset = document.getElementById("btnResetSearch");
        if (btnReset) {
            btnReset.addEventListener("click", () => {
                if (searchInput) searchInput.value = "";
                searchQuery = "";
                if (btnClearSearch) btnClearSearch.style.display = "none";
                setCategory("all");
            });
        }
        return;
    }

    // Render Cards
    containerMenu.innerHTML = "";

    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "menu-card";
        card.setAttribute("data-id", item.id);

        // Icon Kategori
        let iconCat = "🍗";
        if (item.kategori === "Minuman") iconCat = "🥤";
        if (item.kategori === "Snack") iconCat = "🍪";

        card.innerHTML = `
            <div class="card-media">
                <img src="${item.gambar}" alt="${item.nama}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';">
                <span class="badge-category">${iconCat} ${item.kategori}</span>
                <span class="badge-cuisine"><i class="fa-solid fa-earth-asia"></i> ${item.cuisine}</span>
            </div>

            <div class="card-body">
                <div class="card-header-meta">
                    <span class="rating-pill">
                        <i class="fa-solid fa-star"></i> ${item.rating}
                        <small>(${item.reviewCount})</small>
                    </span>
                    <span class="prep-pill"><i class="fa-regular fa-clock"></i> ${item.prepTime}</span>
                </div>

                <h3 class="card-title" title="${item.nama}">${item.nama}</h3>
                <p class="card-desc">${item.deskripsi}</p>

                <div class="card-price-row">
                    <div class="price-box">
                        <span class="price-label">Harga</span>
                        <strong class="price-val">${formatRupiah(item.harga)}</strong>
                    </div>
                </div>

                <div class="card-actions">
                    <button type="button" class="btn-card-detail" data-action="detail" data-id="${item.id}">
                        <i class="fa-solid fa-circle-info"></i> Detail
                    </button>
                    <button type="button" class="btn-card-add" data-action="add" data-id="${item.id}">
                        <i class="fa-solid fa-cart-plus"></i> Pesan
                    </button>
                </div>
            </div>
        `;

        containerMenu.appendChild(card);
    });
}

// Delegasi Event Klik pada Kartu Menu
if (containerMenu) {
    containerMenu.addEventListener("click", function (event) {
        const btn = event.target.closest("button");
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        const itemId = btn.getAttribute("data-id");

        if (!itemId) return;

        const selectedItem = allMenuItems.find(i => String(i.id) === String(itemId));
        if (!selectedItem) return;

        if (action === "detail") {
            bukaModalDetail(selectedItem);
        } else if (action === "add") {
            tambahKeKeranjang(selectedItem);
        }
    });
}

// Set Kategori Aktif
function setCategory(categoryName) {
    currentCategory = categoryName;

    // Update style tombol kategori
    const catButtons = document.querySelectorAll(".cat-btn");
    catButtons.forEach(btn => {
        if (btn.getAttribute("data-category") === categoryName) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    renderMenu();
}

// ==========================================
// 5. EVENT LISTENERS FILTER, SEARCH, & SOURCE
// ==========================================

// Pilihan Sumber Data (API vs Local)
if (btnSourceApi && btnSourceLocal) {
    btnSourceApi.addEventListener("click", function () {
        if (currentSource === "api") return;
        currentSource = "api";
        btnSourceApi.classList.add("active");
        btnSourceLocal.classList.remove("active");
        muatDariApiOnline();
    });

    btnSourceLocal.addEventListener("click", function () {
        if (currentSource === "local") return;
        currentSource = "local";
        btnSourceLocal.classList.add("active");
        btnSourceApi.classList.remove("active");
        muatDariMenuLokal();
    });
}

// Filter Kategori Sidebar
const categoryButtons = document.querySelectorAll(".cat-btn");
categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        setCategory(category);
    });
});

// Pencarian Live Search
if (searchInput) {
    searchInput.addEventListener("input", function (e) {
        searchQuery = e.target.value;
        if (btnClearSearch) {
            btnClearSearch.style.display = searchQuery.length > 0 ? "block" : "none";
        }
        renderMenu();
    });
}

// Tombol Bersihkan Pencarian
if (btnClearSearch) {
    btnClearSearch.addEventListener("click", function () {
        if (searchInput) {
            searchInput.value = "";
            searchQuery = "";
            searchInput.focus();
        }
        btnClearSearch.style.display = "none";
        renderMenu();
    });
}

// Pengurutan (Sorting)
if (sortSelect) {
    sortSelect.addEventListener("change", function (e) {
        currentSort = e.target.value;
        renderMenu();
    });
}

// ==========================================
// 6. LOGIKA MODAL DETAIL MENU
// ==========================================
function bukaModalDetail(item) {
    if (!modalDetail || !modalDetailContent) return;

    const ingredientsHtml = (item.ingredients || []).map(ing => `
        <li><i class="fa-solid fa-check"></i> ${ing}</li>
    `).join("");

    modalDetailContent.innerHTML = `
        <div class="detail-modal-layout">
            <div class="detail-modal-img">
                <img src="${item.gambar}" alt="${item.nama}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';">
                <span class="detail-badge-cat">${item.kategori}</span>
            </div>
            <div class="detail-modal-info">
                <div class="detail-header-meta">
                    <span class="rating-pill"><i class="fa-solid fa-star"></i> ${item.rating} (${item.reviewCount} ulasan)</span>
                    <span class="badge-cuisine"><i class="fa-solid fa-earth-asia"></i> Asal: ${item.cuisine}</span>
                </div>
                <h2>${item.nama}</h2>
                <p class="detail-modal-desc">${item.deskripsi}</p>
                
                <div class="detail-specs-grid">
                    <div class="spec-box">
                        <i class="fa-regular fa-clock"></i>
                        <span>Waktu Masak</span>
                        <strong>${item.prepTime}</strong>
                    </div>
                    <div class="spec-box">
                        <i class="fa-solid fa-fire-burner"></i>
                        <span>Kalori</span>
                        <strong>${item.calories} kkal</strong>
                    </div>
                    <div class="spec-box">
                        <i class="fa-solid fa-shield-heart"></i>
                        <span>Kualitas</span>
                        <strong>100% Halal</strong>
                    </div>
                </div>

                <div class="detail-ingredients">
                    <h4><i class="fa-solid fa-carrot"></i> Komposisi & Bahan:</h4>
                    <ul class="ingredients-list">
                        ${ingredientsHtml}
                    </ul>
                </div>

                <div class="detail-modal-footer">
                    <div class="detail-price-box">
                        <span>Total Harga</span>
                        <strong class="detail-price">${formatRupiah(item.harga)}</strong>
                    </div>
                    <button type="button" class="btn-submit btn-modal-order" id="btnModalAddToCart" data-id="${item.id}">
                        <i class="fa-solid fa-cart-plus"></i> Tambah ke Pesanan
                    </button>
                </div>
            </div>
        </div>
    `;

    modalDetail.style.display = "flex";

    // Tombol tambah ke keranjang dari dalam modal
    const btnModalAdd = document.getElementById("btnModalAddToCart");
    if (btnModalAdd) {
        btnModalAdd.addEventListener("click", function () {
            tambahKeKeranjang(item);
            tutupModalDetail();
        });
    }
}

function tutupModalDetail() {
    if (modalDetail) modalDetail.style.display = "none";
}

if (btnCloseDetailModal) {
    btnCloseDetailModal.addEventListener("click", tutupModalDetail);
}

// Tutup modal jika klik di luar card modal
window.addEventListener("click", function (event) {
    if (event.target === modalDetail) tutupModalDetail();
    if (event.target === modalCart) tutupModalCart();
    if (event.target === modalReceipt) tutupModalReceipt();
});

// ==========================================
// 7. LOGIKA KERANJANG BELANJA & CHECKOUT
// ==========================================

function tambahKeKeranjang(item) {
    const existingIndex = cart.findIndex(c => String(c.id) === String(item.id));

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: item.id,
            nama: item.nama,
            harga: item.harga,
            gambar: item.gambar,
            kategori: item.kategori,
            quantity: 1
        });
    }

    saveCartToStorage();
    showToast(`"${item.nama}" ditambahkan ke keranjang! 🛒`, "success");
}

function updateKuantitasKeranjang(id, delta) {
    const index = cart.findIndex(c => String(c.id) === String(id));
    if (index > -1) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
            showToast("Item dihapus dari keranjang.", "info");
        }
        saveCartToStorage();
    }
}

function hapusItemKeranjang(id) {
    cart = cart.filter(c => String(c.id) !== String(id));
    saveCartToStorage();
    showToast("Item berhasil dihapus.", "info");
}

function hitungTotalKeranjang() {
    return cart.reduce((total, item) => total + (item.harga * item.quantity), 0);
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update Counter Badge di Navbar
    if (cartCountBadge) {
        cartCountBadge.textContent = totalItems;
        if (totalItems > 0) {
            cartCountBadge.classList.add("badge-pulse");
            setTimeout(() => cartCountBadge.classList.remove("badge-pulse"), 400);
        }
    }

    // Jika modal keranjang sedang terbuka, render daftarnya
    if (cartItemsList) {
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="empty-cart-view">
                    <div class="empty-cart-icon"><i class="fa-solid fa-cart-arrow-down"></i></div>
                    <h4>Keranjang Masih Kosong</h4>
                    <p>Ayo pilih makanan atau minuman favoritmu di daftar menu!</p>
                </div>
            `;
            if (cartSubtotalEl) cartSubtotalEl.textContent = formatRupiah(0);
            if (cartTotalEl) cartTotalEl.textContent = formatRupiah(0);
            if (btnCheckout) btnCheckout.disabled = true;
            if (btnClearCart) btnClearCart.disabled = true;
            return;
        }

        if (btnCheckout) btnCheckout.disabled = false;
        if (btnClearCart) btnClearCart.disabled = false;

        cartItemsList.innerHTML = "";
        cart.forEach(item => {
            const itemRow = document.createElement("div");
            itemRow.className = "cart-item-row";
            itemRow.innerHTML = `
                <img src="${item.gambar}" alt="${item.nama}" class="cart-thumb" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';">
                <div class="cart-item-info">
                    <h5>${item.nama}</h5>
                    <span class="cart-item-price">${formatRupiah(item.harga)}</span>
                </div>
                <div class="cart-qty-control">
                    <button type="button" class="btn-qty btn-qty-minus" data-id="${item.id}" title="Kurangi">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="qty-number">${item.quantity}</span>
                    <button type="button" class="btn-qty btn-qty-plus" data-id="${item.id}" title="Tambah">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-subtotal">
                    ${formatRupiah(item.harga * item.quantity)}
                </div>
                <button type="button" class="btn-remove-item" data-id="${item.id}" title="Hapus item">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            cartItemsList.appendChild(itemRow);
        });

        const total = hitungTotalKeranjang();
        if (cartSubtotalEl) cartSubtotalEl.textContent = formatRupiah(total);
        if (cartTotalEl) cartTotalEl.textContent = formatRupiah(total);
    }
}

// Delegasi Event Klik pada Item Keranjang
if (cartItemsList) {
    cartItemsList.addEventListener("click", function (e) {
        const btnMinus = e.target.closest(".btn-qty-minus");
        const btnPlus = e.target.closest(".btn-qty-plus");
        const btnRemove = e.target.closest(".btn-remove-item");

        if (btnMinus) {
            const id = btnMinus.getAttribute("data-id");
            updateKuantitasKeranjang(id, -1);
        } else if (btnPlus) {
            const id = btnPlus.getAttribute("data-id");
            updateKuantitasKeranjang(id, 1);
        } else if (btnRemove) {
            const id = btnRemove.getAttribute("data-id");
            hapusItemKeranjang(id);
        }
    });
}

function bukaModalCart() {
    if (modalCart) {
        updateCartUI();
        modalCart.style.display = "flex";
    }
}

function tutupModalCart() {
    if (modalCart) modalCart.style.display = "none";
}

if (btnOpenCart) btnOpenCart.addEventListener("click", bukaModalCart);
if (btnCloseCartModal) btnCloseCartModal.addEventListener("click", tutupModalCart);

// Kosongkan Keranjang
if (btnClearCart) {
    btnClearCart.addEventListener("click", function () {
        if (cart.length === 0) return;
        if (confirm("Apakah Anda yakin ingin mengosongkan seluruh isi keranjang?")) {
            cart = [];
            saveCartToStorage();
            showToast("Keranjang berhasil dikosongkan.", "info");
        }
    });
}

// Proses Pemesanan / Checkout (Simulasi Struk Digital Kantin)
if (btnCheckout) {
    btnCheckout.addEventListener("click", function () {
        if (cart.length === 0) {
            showToast("Keranjang belanja masih kosong!", "warning");
            return;
        }

        const user = JSON.parse(localStorage.getItem("kantinUser")) || { displayName: "Mahasiswa Kampus" };
        const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        const orderDate = new Date().toLocaleString("id-ID", {
            dateStyle: "medium",
            timeStyle: "short"
        });
        const note = orderNoteInput && orderNoteInput.value.trim() ? orderNoteInput.value.trim() : "-";
        const totalBayar = hitungTotalKeranjang();

        const itemsReceiptHtml = cart.map(c => `
            <div class="receipt-item-row">
                <span>${c.nama} x ${c.quantity}</span>
                <strong>${formatRupiah(c.harga * c.quantity)}</strong>
            </div>
        `).join("");

        if (receiptDetails) {
            receiptDetails.innerHTML = `
                <div class="receipt-box-info">
                    <div class="receipt-row"><span>No. Antrean:</span> <strong>#${orderId}</strong></div>
                    <div class="receipt-row"><span>Pemesan:</span> <strong>${user.displayName || user.username}</strong></div>
                    <div class="receipt-row"><span>Waktu Pesan:</span> <span>${orderDate}</span></div>
                    <div class="receipt-row"><span>Status:</span> <span class="badge-status-ready">Menunggu Pengambilan</span></div>
                    <div class="receipt-row"><span>Catatan:</span> <em>${note}</em></div>
                </div>
                <div class="receipt-divider"></div>
                <h4>Rincian Menu:</h4>
                <div class="receipt-menu-list">
                    ${itemsReceiptHtml}
                </div>
                <div class="receipt-divider"></div>
                <div class="receipt-total-row">
                    <span>Total Pembayaran</span>
                    <strong>${formatRupiah(totalBayar)}</strong>
                </div>
            `;
        }

        // Reset keranjang
        cart = [];
        saveCartToStorage();
        if (orderNoteInput) orderNoteInput.value = "";

        tutupModalCart();
        if (modalReceipt) modalReceipt.style.display = "flex";
        showToast("Pesanan berhasil dikirim ke dapur kantin! 🍳", "success");
    });
}

function tutupModalReceipt() {
    if (modalReceipt) modalReceipt.style.display = "none";
}

if (btnCloseReceipt) btnCloseReceipt.addEventListener("click", tutupModalReceipt);

// ==========================================
// 8. EVENT DOMContentLoaded
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    initUserSession();
    initCartFromStorage();
    muatDariApiOnline(); // Mulai dengan fetch dari API online
});
