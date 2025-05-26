const waveCanvas = document.getElementById("waveCanvas");
const waveCtx = waveCanvas.getContext("2d");
const smokeCanvas = document.getElementById("smokeCanvas");
const smokeCtx = smokeCanvas.getContext("2d");

waveCanvas.width = window.innerWidth;
waveCanvas.height = window.innerHeight;
smokeCanvas.width = window.innerWidth;
smokeCanvas.height = window.innerHeight;

let increment = 0;
function drawWave(color, amplitude, frequency, speed, lineColor) {
    waveCtx.beginPath();
    for (let x = 0; x < waveCanvas.width; x++) {
        const y = waveCanvas.height / 2 + Math.sin(x * frequency + increment) * amplitude;
        waveCtx.lineTo(x, y);
    }
    waveCtx.strokeStyle = color;
    waveCtx.lineWidth = 2;
    waveCtx.stroke();

    waveCtx.beginPath();
    for (let x = 0; x < waveCanvas.width; x++) {
        const y = waveCanvas.height / 2 + Math.sin(x * frequency + increment) * amplitude;
        waveCtx.lineTo(x, y - 10);
    }
    waveCtx.strokeStyle = lineColor;
    waveCtx.lineWidth = 1;
    waveCtx.stroke();
}

const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push({
        x: Math.random() * smokeCanvas.width,
        y: Math.random() * smokeCanvas.height,
        radius: Math.random() * 40 + 10,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        opacity: Math.random() * 0.15 + 0.03
    });
}

function drawSmoke() {
    smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
    particles.forEach(p => {
        smokeCtx.beginPath();
        smokeCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        smokeCtx.fillStyle = `rgba(200, 200, 255, ${p.opacity})`;
        smokeCtx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > smokeCanvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > smokeCanvas.height) p.vy *= -1;
    });
}

function animate() {
    requestAnimationFrame(animate);
    waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    drawWave("rgba(0, 123, 255, 0.7)", 80, 0.005, 0.01, "rgba(173, 216, 230, 0.7)");
    drawWave("rgba(0, 86, 179, 0.5)", 60, 0.006, 0.01, "rgba(135, 206, 250, 0.7)");
    drawWave("rgba(255, 255, 255, 0.3)", 40, 0.007, 0.01, "rgba(240, 248, 255, 0.7)");
    drawWave("rgba(0, 191, 255, 0.5)", 50, 0.006, 0.01, "rgba(176, 224, 230, 0.7)");
    drawWave("rgba(135, 206, 250, 0.4)", 30, 0.008, 0.01, "rgba(224, 255, 255, 0.7)");
    increment += 0.001;
    drawSmoke();
}

animate();

window.addEventListener("resize", () => {
    waveCanvas.width = window.innerWidth;
    waveCanvas.height = window.innerHeight;
    smokeCanvas.width = window.innerWidth;
    smokeCanvas.height = window.innerHeight;
});
