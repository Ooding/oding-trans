// Voice: pakai assets/voice.mp3 kalau ada (suara anak asli), fallback ke suara browser (pitch tinggi)
const TEXT = "Ayo paak, bapak order dan gass!";
let played = false;
function speak() {
  const a = new Audio('assets/voice.mp3');
  a.play().catch(() => {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(TEXT);
    u.lang = 'id-ID'; u.pitch = 2; u.rate = 1.05; u.volume = 1;
    const v = speechSynthesis.getVoices().find(x => x.lang.startsWith('id'));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  });
}
document.querySelectorAll('.wa-go').forEach(el => el.addEventListener('click', speak));
if ('speechSynthesis' in window) speechSynthesis.getVoices();
