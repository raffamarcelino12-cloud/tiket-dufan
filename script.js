let kaburCount = 0;
const maxKabur = 4;
const btnKabur = document.getElementById('btnKabur');

function pindahPosisiAcak() {
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 220;
    if (btnKabur) {
        btnKabur.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
}

if (btnKabur) {
    btnKabur.addEventListener('click', (e) => {
        e.preventDefault();
        if (kaburCount < maxKabur) {
            kaburCount++;
            pindahPosisiAcak();
            if (kaburCount === 1) btnKabur.innerText = "Eitss, CUPS!";
            else if (kaburCount === 2) btnKabur.innerText = "MASA GAK KENA! ";
            else if (kaburCount === 3) btnKabur.innerText = "Dikit lagi!";
            else if (kaburCount === maxKabur) {
                btnKabur.innerText = "Silly pegelya, jangan beefing pls";
                btnKabur.style.background = "linear-gradient(135deg, #2ed573, #26af5f)";
            }
        } else {
            // 🎵 LAGU NYALA SETELAH JEDA 1 DETIK PAS KLIK TERAKHIR
            setTimeout(() => {
                const music = document.getElementById('bgMusic');
                if (music) {
                    music.play().catch(error => {
                        console.log("Audio diblokir browser:", error);
                    });
                }
            }, 1000); // Jeda 1 detik

            gantiSlide(1); // Lanjut ke Slide Login (Slide 1)
        }
    });

    btnKabur.addEventListener('mouseenter', () => {
        if (kaburCount < maxKabur) pindahPosisiAcak();
    });
}

// --- FUNGSI CEK LOGIN ---
function cekLogin() {
    const inputNama = document.getElementById('inputNama');
    const inputPass = document.getElementById('inputPass');
    const errorMsg = document.getElementById('errorMsg');

    if (!inputNama || !inputPass) return;

    const nama = inputNama.value.trim();
    const pass = inputPass.value.trim();

    if (nama.toLowerCase() === "baba" && pass.toLowerCase() === "pengki") {
        if (errorMsg) errorMsg.style.display = "none";
        gantiSlide(2); // Masuk ke Slide Kereta (Slide 2)
    } else {
        if (errorMsg) errorMsg.style.display = "block";
    }
}

// --- FUNGSI PINDAH SLIDE BERURUTAN (KELUAR DULU, BARU MASUK) ---
function gantiSlide(targetSlide) {
    const currentActive = document.querySelector('.slide.active');
    const target = document.getElementById('slide' + targetSlide);

    if (!target) {
        console.error("Slide dengan ID 'slide" + targetSlide + "' tidak ditemukan!");
        return;
    }

    if (currentActive) {
        // 1. Slide lama mulai keluar (Fade Out 3 detik)
        currentActive.classList.add('exit');
        currentActive.classList.remove('active');

        // 2. Tunggu sampai slide lama benar-benar selesai keluar (3 detik), baru masukkan slide baru
        setTimeout(() => {
            currentActive.classList.remove('exit'); // Bersihkan kelas exit
            target.classList.add('active');         // Masukkan slide baru (Fade In 3 detik)
        }, 2000); 
    } else {
        target.classList.add('active');
    }
}
// --- SCRIPT GENERATE FOTO VERTICAL SLIDE 5 ---
const vertLeft = document.getElementById('vertLeft');
const vertRight = document.getElementById('vertRight');

if (vertLeft && vertRight) {
    for (let i = 1; i <= 8; i++) {
        vertLeft.innerHTML += `
            <div class="photo-card-vert">
                <img src="https://picsum.photos/seed/vertA${i}/150/150" alt="V ${i}">
            </div>
        `;
        vertRight.innerHTML += `
            <div class="photo-card-vert">
                <img src="https://picsum.photos/seed/vertB${i}/150/150" alt="V ${i+8}">
            </div>
        `;
    }
    // Gandakan elemen agar infinite loop vertikalnya mulus
    vertLeft.innerHTML += vertLeft.innerHTML;
    vertRight.innerHTML += vertRight.innerHTML;
}

function cekJawaban(isBenar) {
    const feedback = document.getElementById('quizFeedback');
    const btnNext = document.getElementById('btnNextQuiz');
    
    if (isBenar) {
        feedback.style.color = "#2ed573";
        feedback.innerText = "Hmmm lazatos";
        btnNext.style.opacity = "1";
        btnNext.style.pointerEvents = "auto";
    } else {
        feedback.style.color = "#ff4757";
        feedback.innerText = "CUPS";
    }
}

function klaimKupon(element) {
    element.style.background = "#2ed573";
    element.style.color = "white";
    element.style.borderColor = "#2ed573";
    element.innerHTML = "<strong>✅ Kupon Berhasil Diklaim!</strong><p style='font-size: 0.8rem; margin: 4px 0 0 0;'>Screenshot terus kirim ya</p>";
}

// Teks ucapan yang akan muncul seperti diketik
const pesanPenutup = "Selamat ulang tahun ya, Yasmine Aura Maryam! 🎉 Semoga di umur yang baru ini kamu selalu dikelilingi hal-hal baik, makin bahagia, dan semua impianmu tercapai. ✨💖";

let isTyped = false;

function tiupLilin() {
    const flame = document.getElementById('flame');
    const wishText = document.getElementById('wishText');
    
    if (flame) {
        flame.style.display = 'none'; // Matikan api lilin
        wishText.style.color = '#2ed573';
        wishText.innerHTML = ' YEY LILINNYA MATI';
        
        // Jalankan efek mengetik teks ucapan jika belum pernah dijalankan
        if (!isTyped) {
            isTyped = true;
            mulaiKetikTeks();
        }
    }
}

function mulaiKetikTeks() {
    const typedElement = document.getElementById('typedMessage');
    if (!typedElement) return;
    
    typedElement.innerHTML = "";
    let i = 0;
    const speed = 45; // Kecepatan mengetik (milidetik per huruf)

    function ketik() {
        if (i < pesanPenutup.length) {
            typedElement.innerHTML += pesanPenutup.charAt(i);
            i++;
            setTimeout(ketik, speed);
        }
    }
    ketik();
}

function kirimWhatsApp() {
    // Ganti nomor WhatsApp kamu di bawah (pakai kode negara, contoh: 6281234567890)
    // Jangan pakai angka 0 di depan, langsung 62 ya!
    const nomorWhatsApp = "6288293944714"; 
    
    // Pesan otomatis yang bakal muncul di chat WA nanti
    const pesan = "Hai Aura, kirim apa yang kamu rasa dang inginkan di sini ya secara jujur 💖✨";
    
    // Encode pesan supaya aman dibaca URL
    const urlWA = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
    
    // Buka WhatsApp di tab/aplikasi baru
    window.open(urlWA, '_blank');
}