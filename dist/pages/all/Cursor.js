import React, { useEffect, useRef } from 'react';
// Quantum behavior/parameters verified against:
// https://www.vision-environnement.com/js/ve-cursor-effects.js?v=1
// React integration; only the Quantum particle renderer is needed here.
const CONFIG = {
    maxParticles: 34, lifeMin: 260, lifeMax: 520,
    spawnDistance: 8, spawnInterval: 12,
    sizeMin: 1.2, sizeMax: 3.3, drift: 0.18,
    gravity: 0.003, opacity: 0.78, fadePower: 1.7, dprMax: 2
};
const random = (min, max) => min + Math.random() * (max - min);
export default function Cursor() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches ||
            'ontouchstart' in window || navigator.maxTouchPoints > 0)
            return undefined;
        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        if (!ctx)
            return undefined;
        let width = 1;
        let height = 1;
        let particles = [];
        let frame = null;
        let spawnX = -9999;
        let spawnY = -9999;
        let spawnedAt = 0;
        let previousX = 0;
        let previousY = 0;
        const resize = () => {
            width = window.innerWidth || document.documentElement.clientWidth || 1;
            height = window.innerHeight || document.documentElement.clientHeight || 1;
            const ratio = Math.min(window.devicePixelRatio || 1, CONFIG.dprMax);
            const w = Math.max(1, Math.round(width * ratio));
            const h = Math.max(1, Math.round(height * ratio));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            }
        };
        const animate = (now) => {
            frame = null;
            ctx.clearRect(0, 0, width, height);
            const alive = [];
            particles.forEach((p, index) => {
                const age = now - p.born;
                if (age >= p.life)
                    return;
                const alpha = Math.pow(1 - age / p.life, CONFIG.fadePower) * CONFIG.opacity;
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.985;
                p.vy = p.vy * 0.985 + CONFIG.gravity;
                p.x += Math.sin((age + index * 17) * 0.015) * CONFIG.drift;
                const radius = p.size * 1.35;
                const color = 'rgba(' + p.rgb + ',' + alpha + ')';
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.strokeStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 9;
                ctx.lineWidth = Math.max(0.55, radius * 0.28);
                ctx.beginPath();
                ctx.moveTo(-radius, 0);
                ctx.lineTo(radius, 0);
                ctx.moveTo(0, -radius);
                ctx.lineTo(0, radius);
                ctx.stroke();
                if (radius > 2) {
                    ctx.globalAlpha = alpha * 0.55;
                    const diagonal = radius * 0.55;
                    ctx.beginPath();
                    ctx.moveTo(-diagonal, -diagonal);
                    ctx.lineTo(diagonal, diagonal);
                    ctx.moveTo(diagonal, -diagonal);
                    ctx.lineTo(-diagonal, diagonal);
                    ctx.stroke();
                }
                ctx.restore();
                alive.push(p);
            });
            particles = alive;
            if (particles.length)
                frame = requestAnimationFrame(animate);
            else
                ctx.clearRect(0, 0, width, height);
        };
        const move = (event) => {
            if (event.pointerType === 'touch')
                return;
            const x = event.clientX;
            const y = event.clientY;
            const now = performance.now();
            const distance = Math.hypot(x - spawnX, y - spawnY);
            if (distance >= CONFIG.spawnDistance && now - spawnedAt >= CONFIG.spawnInterval) {
                const angle = Math.atan2(y - previousY, (x - previousX) || 0.001);
                const count = distance > 22 ? 2 : 1;
                for (let i = 0; i < count; i += 1) {
                    const offsetX = random(-1.5, 1.5);
                    const offsetY = random(-1.5, 1.5);
                    if (particles.length >= CONFIG.maxParticles)
                        particles.shift();
                    const life = random(CONFIG.lifeMin, CONFIG.lifeMax);
                    const speed = random(0.15, 0.65);
                    const side = random(-0.55, 0.55);
                    particles.push({
                        x: x + offsetX + random(-2.2, 2.2),
                        y: y + offsetY + random(-2.2, 2.2),
                        vx: -Math.cos(angle) * speed + Math.cos(angle + Math.PI / 2) * side,
                        vy: -Math.sin(angle) * speed + Math.sin(angle + Math.PI / 2) * side,
                        born: performance.now(), life,
                        size: random(CONFIG.sizeMin, CONFIG.sizeMax),
                        rgb: Math.random() < 0.36 ? '143,123,255' : '255,105,230'
                    });
                    // Original also samples rotation/spin/character for other themes.
                    // Preserve its random sequence, though stars do not use those fields.
                    Math.random();
                    Math.random();
                    Math.random();
                }
                spawnX = x;
                spawnY = y;
                spawnedAt = now;
                if (frame === null)
                    frame = requestAnimationFrame(animate);
            }
            previousX = x;
            previousY = y;
        };
        resize();
        window.addEventListener('resize', resize, { passive: true });
        window.addEventListener('pointermove', move, { passive: true });
        return () => {
            if (frame !== null)
                cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', move);
            ctx.clearRect(0, 0, width, height);
        };
    }, []);
    return React.createElement("canvas", { ref: canvasRef, className: "cpk-quantum-cursor", "aria-hidden": "true" });
}
export const layout = { areaId: 'body', sortOrder: 900 };
//# sourceMappingURL=Cursor.js.map