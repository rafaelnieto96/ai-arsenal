// ai-background.js
let neurons = [];
let NUM_NEURONS = 40; // Valor predeterminado que se ajustará
let ACTIVATION_DISTANCE = 150; // Se ajustará según el tamaño de pantalla
let MAX_CONNECTIONS = 5; // También se puede ajustar

function calculateDensity() {
    // Reducir la densidad de neuronas en dispositivos móviles
    const screenArea = window.innerWidth * window.innerHeight;
    const baseDensity = 0.00004; // Factor de densidad ajustable

    // Calcular números basados en el tamaño de la pantalla
    NUM_NEURONS = Math.max(10, Math.floor(screenArea * baseDensity));

    // Ajustar la distancia de activación para pantallas pequeñas
    ACTIVATION_DISTANCE = Math.min(150, Math.max(80, window.innerWidth / 10));

    // Ajustar conexiones máximas
    MAX_CONNECTIONS = window.innerWidth < 768 ? 3 : 5;
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    noFill();
    angleMode(DEGREES);

    // Configurar densidad basada en el tamaño de pantalla
    calculateDensity();

    // Crear neuronas iniciales
    for (let i = 0; i < NUM_NEURONS; i++) {
        neurons.push(new Neuron());
    }
}

function drawGradientBackground(c1, c2) {
    noFill();
    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(0, y, width, y);
    }
    noStroke();
}

function draw() {
    let color1 = color(30, 30, 70);
    let color2 = color(70, 30, 80);
    drawGradientBackground(color1, color2);

    // Actualizar y mostrar neuronas
    neurons.forEach(neuron => {
        neuron.update();
        neuron.show();
    });

    // Dibujar conexiones activas
    drawNeuralConnections();

    // Efecto de pulso global - desactivar en móviles para mejor rendimiento
    if (window.innerWidth > 768) {
        globalPulseEffect();
    }
}

class Neuron {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.connections = [];
        this.pulse = 0;

        // Ajustar tamaño para dispositivos pequeños
        const baseSize = window.innerWidth < 768 ? 6 : 8;
        this.targetSize = random(baseSize, baseSize * 1.8);

        this.hue = random(180, 220);
    }

    update() {
        // Movimiento más lento en dispositivos móviles para mejor rendimiento
        const moveSpeed = window.innerWidth < 768 ? 0.2 : 0.3;
        this.pos.add(createVector(random(-moveSpeed, moveSpeed), random(-moveSpeed, moveSpeed)));
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);

        // Interacción con el mouse
        let mouseDist = dist(mouseX, mouseY, this.pos.x, this.pos.y);
        if (mouseDist < ACTIVATION_DISTANCE) {
            this.activate();
        }

        // Decaimiento del pulso
        this.pulse = lerp(this.pulse, 0, 0.1);
    }

    activate() {
        this.pulse = 1;
        this.hue = (this.hue + 1) % 360;
    }

    show() {
        // Núcleo de la neurona
        let glowSize = this.targetSize * (1 + this.pulse * 2);
        let alpha = 150 + 105 * sin(frameCount * 0.1);

        // Efecto de brillo interno
        fill(this.hue, 200, 255, alpha * 0.5);
        noStroke();
        ellipse(this.pos.x, this.pos.y, glowSize);

        // Cuerpo principal
        stroke(this.hue, 200, 255, alpha);
        strokeWeight(window.innerWidth < 768 ? 1.5 : 2);
        fill(30, 50, 80);
        ellipse(this.pos.x, this.pos.y, this.targetSize);
    }
}

function drawNeuralConnections() {
    neurons.forEach((a, i) => {
        // Ordenar neuronas por distancia
        let others = neurons.slice(i + 1)
            .map(b => ({ neuron: b, dist: dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y) }))
            .sort((x, y) => x.dist - y.dist)
            .slice(0, MAX_CONNECTIONS);

        others.forEach(({ neuron: b, dist }) => {
            if (dist < ACTIVATION_DISTANCE * 1.8) { // Reducido de 2 a 1.8 para móviles
                let alpha = map(dist, 0, ACTIVATION_DISTANCE * 1.8, 255, 0);
                let lineWidth = map(dist, 0, ACTIVATION_DISTANCE * 1.8,
                    window.innerWidth < 768 ? 2 : 3,
                    window.innerWidth < 768 ? 0.3 : 0.5);

                // Efecto de pulso en las conexiones - más sutil en móviles
                let pulseSpeed = window.innerWidth < 768 ? 0.03 : 0.05;
                let pulse = (sin(frameCount * pulseSpeed + dist * 0.01) + 1) * 0.5;
                alpha *= pulse;

                stroke(a.hue, 200, 255, alpha);
                strokeWeight(lineWidth);
                line(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
            }
        });
    });
}

function globalPulseEffect() {
    // Efecto de onda expansiva desde el mouse - más sutil en móviles
    noFill();
    stroke(180, 100, 255, window.innerWidth < 768 ? 40 : 70);
    strokeWeight(window.innerWidth < 768 ? 1 : 1.5);
    let pulseSize = (frameCount % 120) * (window.innerWidth < 768 ? 3 : 4);
    ellipse(mouseX, mouseY, pulseSize, pulseSize);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);

    // Recalcular densidad y reiniciar neuronas
    calculateDensity();

    // Reiniciar neuronas con nueva configuración
    neurons = [];
    for (let i = 0; i < NUM_NEURONS; i++) {
        neurons.push(new Neuron());
    }
}