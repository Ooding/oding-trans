// Voice: pakai assets/voice.mp3 kalau ada (suara anak asli), fallback ke suara browser (pitch tinggi).
// Link WhatsApp baru dibuka SETELAH suara selesai, jadi suaranya kedengaran penuh.
const TEXT = "Ayo paak, bapak order dan gass!";
let busy = false;

function speak(done) {
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    setTimeout(done, 350);
  };
  setTimeout(finish, 6000); // pengaman kalau suara macet

  const a = new Audio('assets/voice.mp3');
  a.onended = finish;
  a.play().catch(() => {
    if (!('speechSynthesis' in window)) return finish();
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(TEXT);
    u.lang = 'id-ID'; u.pitch = 2; u.rate = 0.9; u.volume = 1;
    const v = speechSynthesis.getVoices().find(x => x.lang.startsWith('id'));
    if (v) u.voice = v;
    u.onend = finish; u.onerror = finish;
    speechSynthesis.speak(u);
  });
}

document.querySelectorAll('.wa-go').forEach(el => el.addEventListener('click', e => {
  e.preventDefault();
  if (busy) return;
  busy = true;
  const url = el.href;
  speak(() => { busy = false; window.location.href = url; });
}));

if ('speechSynthesis' in window) speechSynthesis.getVoices();
