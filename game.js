// SIMULATED NETWORK LAYER / CLIENT HOOKS
const socket = (typeof io !== 'undefined') ? io() : { emit: () => {}, on: () => {} };

const GAME_ENGINE = {
    IS_PLAYING: false,
    CURRENT_MODE: null,
    ROOM_ID: null,
    
    // STRICT GAME ENTITY MODELS
    PLAYER: { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: 25, color: '#ff0066', score: 0, speed: 4, protected: false },
    BOTS: [],
    FOOD: [],
    PARTICLES: [],
    SHOCKWAVES: [],
    
    // VISUAL LAYERS REFERENCE METRICS
    MOUSE: { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2 },
    PARALLAX_OFFSET: { x: 0, y: 0 },
    CAMERA_ZOOM: 1,
    TARGET_ZOOM: 1,

    INITIALIZE: function() {
        this.SETUP_CANVASES();
        this.BIND_EVENTS();
        this.SPAWN_STATIC_WORLD_ENTITIES();
        this.START_GRAPHICS_LOOP();
    },

    SETUP_CANVASES: function() {
        this.bgCanvas = document.getElementById('bg-canvas');
        this.bgCtx = this.bgCanvas.getContext('2d');
        this.gameCanvas = document.getElementById('game-canvas');
        this.gameCtx = this.gameCanvas.getContext('2d');
        this.RESIZE_CANVASES();
    },

    RESIZE_CANVASES: function() {
        this.bgCanvas.width = window.innerWidth;
        this.bgCanvas.height = window.innerHeight;
        this.gameCanvas.width = window.innerWidth;
        this.gameCanvas.height = window.innerHeight;
    },

    BIND_EVENTS: function() {
        window.addEventListener('resize', () => this.RESIZE_CANVASES());
        
        // MOUSE PARALLAX CAPTURE INTERCEPTORS
        window.addEventListener('mousemove', (e) => {
            this.MOUSE.targetX = e.clientX;
            this.MOUSE.targetY = e.clientY;
        });

        // HANDLE LIVE PACKET INJECTIONS
        socket.on('match_joined', (data) => {
            this.ROOM_ID = data.roomId;
            this.EXECUTE_SPAWN_SEQUENCE();
        });

        socket.on('play_elimination_effect', (data) => {
            this.GENERATE_EXPLOSION_PARTICLES(data.x, data.y, data.color);
        });
    },

    SPAWN_STATIC_WORLD_ENTITIES: function() {
        this.FOOD = [];
        for (let i = 0; i < 150; i++) {
            this.FOOD.push({
                x: Math.random() * window.innerWidth * 2 - window.innerWidth / 2,
                y: Math.random() * window.innerHeight * 2 - window.innerHeight / 2,
                radius: 4,
                color: `hsl(${Math.random() * 360}, 100%, 60%)`
            });
        }
    },

    INITIALIZE_MATCH: function(mode) {
        this.CURRENT_MODE = mode;
        if (mode === 'MULTIPLAYER') {
            socket.emit('join_multiplayer');
            // Mock connection directly if backend instance isn't explicitly listening
            setTimeout(() => { if(!this.IS_PLAYING) this.EXECUTE_SPAWN_SEQUENCE(); }, 400);
        } else if (mode === 'PRIVATE') {
            UI_ENGINE.OPEN_GROUP_CODE_MODAL();
        } else {
            // SYNCED OFFLINE ARTIFICIAL INTELLIGENCE ENVIRONMENT
            this.BOTS = [];
            for(let i=0; i<15; i++) {
                this.BOTS.push({
                    id: 'AI_' + i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    radius: 12 + Math.random() * 25,
                    color: `hsl(${Math.random() * 360}, 80%, 50%)`,
                    targetX: Math.random() * window.innerWidth,
                    targetY: Math.random() * window.innerHeight
                });
            }
            this.EXECUTE_SPAWN_SEQUENCE();
        }
    },

    CONNECT_PRIVATE_ROOM: function() {
        const code = document.getElementById('group-code-input').value;
        if(code.length > 2) {
            UI_ENGINE.CLOSE_EXCLUSIVE_MODALS();
            socket.emit('join_private', code);
            setTimeout(() => { if(!this.IS_PLAYING) this.EXECUTE_SPAWN_SEQUENCE(); }, 400);
        }
    },

    EXECUTE_SPAWN_SEQUENCE: function() {
        UI_ENGINE.CLOSE_EXCLUSIVE_MODALS();
        UI_ENGINE.HIDE_ALL_BASE_VIEWS();
        document.getElementById('gameplay-hud').classList.add('active');
        
        // SHUTTER ANIMATION EFFECT WITH SHIELD SAFEGUARDS
        this.PLAYER.radius = 20;
        this.PLAYER.score = 0;
        this.PLAYER.protected = true;
        this.TARGET_ZOOM = 1.3;
        this.IS_PLAYING = true;
        
        document.getElementById('player-coins').innerText = this.PLAYER.score;

        setTimeout(() => { this.PLAYER.protected = false; this.TARGET_ZOOM = 1.0; }, 2000);
    },

    START_GRAPHICS_LOOP: function() {
        let lastTime = 0;
        const loop = (timestamp) => {
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            
            this.UPDATE_LOGIC(deltaTime);
            this.RENDER_GRAPHICS_LAYERS(timestamp);
            
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    },

    UPDATE_LOGIC: function(dt) {
        // INTERPOLATE CURSOR INTERFACE POSITIONS
        this.MOUSE.x += (this.MOUSE.targetX - this.MOUSE.x) * 0.1;
        this.MOUSE.y += (this.MOUSE.targetY - this.MOUSE.y) * 0.1;
        
        this.PARALLAX_OFFSET.x = (this.MOUSE.x - window.innerWidth / 2);
        this.PARALLAX_OFFSET.y = (this.MOUSE.y - window.innerHeight / 2);
        
        // INTERPOLATE VIEWPORT CAMERA SCALING
        this.CAMERA_ZOOM += (this.TARGET_ZOOM - this.CAMERA_ZOOM) * 0.05;

        // PARALLAX RE-INJECTION FOR DOM ELEMENT LAYER 2
        const glowLayer = document.getElementById('glow-field-layer');
        if (glowLayer) {
            const speed = parseFloat(glowLayer.getAttribute('data-speed'));
            glowLayer.style.transform = `translate3d(${-this.PARALLAX_OFFSET.x * speed}px, ${-this.PARALLAX_OFFSET.y * speed}px, 0)`;
        }

        if (!this.IS_PLAYING) return;

        // CALCULATE VELOCITY ORIENTATIONS
        const dx = this.MOUSE.targetX - (window.innerWidth / 2);
        const dy = this.MOUSE.targetY - (window.innerHeight / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 10) {
            this.PLAYER.x += (dx / distance) * this.PLAYER.speed;
            this.PLAYER.y += (dy / distance) * this.PLAYER.speed;
        }

        // ENGAGE SIMULATED REPRODUCIBLE BOT STRATEGIES
        if (this.CURRENT_MODE === 'BOT_MATCH') {
            this.BOTS.forEach(bot => {
                const bdx = bot.targetX - bot.x;
                const bdy = bot.targetY - bot.y;
                const bdist = Math.sqrt(bdx * bdx + bdy * bdy);
                
                if(bdist < 20) {
                    bot.targetX = Math.random() * window.innerWidth;
                    bot.targetY = Math.random() * window.innerHeight;
                } else {
                    bot.x += (bdx / bdist) * 2;
                    bot.y += (bdy / bdist) * 2;
                }

                // CRITICAL INGEST EVALUATION OVER LAPLACE EXTENTS
                if (!this.PLAYER.protected && this.CHECK_STRICT_OVERLAP(bot, this.PLAYER)) {
                    this.TRIGGER_ELIMINATION_CINEMATIC();
                }
                if (this.CHECK_STRICT_OVERLAP(this.PLAYER, bot)) {
                    this.GENERATE_EXPLOSION_PARTICLES(bot.x, bot.y, bot.color);
                    this.PLAYER.radius += bot.radius * 0.15;
                    this.PLAYER.score += Math.floor(bot.radius * 10);
                    bot.x = Math.random() * window.innerWidth;
                    bot.y = Math.random() * window.innerHeight;
                    document.getElementById('player-coins').innerText = this.PLAYER.score;
                }
            });
        }

        // EVALUATE FOOD COLLISION DETECTION ARRAYS
        for (let i = this.FOOD.length - 1; i >= 0; i--) {
            const f = this.FOOD[i];
            const fdx = this.PLAYER.x - f.x;
            const fdy = this.PLAYER.y - f.y;
            const fdist = Math.sqrt(fdx * fdx + fdy * fdy);
            
            if (fdist < this.PLAYER.radius) {
                this.GENERATE_FOOD_BURST(f.x, f.y, f.color);
                this.PLAYER.radius += 0.4;
                this.PLAYER.score += 10;
                document.getElementById('player-coins').innerText = this.PLAYER.score;
                
                f.x = Math.random() * window.innerWidth * 2 - window.innerWidth / 2;
                f.y = Math.random() * window.innerHeight * 2 - window.innerHeight / 2;
            }
        }

        // RE-PROCESS PARTICLES MATRICES
        for (let i = this.PARTICLES.length - 1; i >= 0; i--) {
            const p = this.PARTICLES[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;
            if (p.alpha <= 0) this.PARTICLES.splice(i, 1);
        }

        // RE-PROCESS SHOCKWAVES MAPS
        for (let i = this.SHOCKWAVES.length - 1; i >= 0; i--) {
            const sw = this.SHOCKWAVES[i];
            sw.radius += sw.speed;
            sw.alpha -= 0.02;
            if(sw.alpha <= 0) this.SHOCKWAVES.splice(i, 1);
        }
    },

    CHECK_STRICT_OVERLAP: function(attacker, victim) {
        const dx = attacker.x - victim.x;
        const dy = attacker.y - victim.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // RULE DEFINITION: Attacker must hold larger scale boundaries and swallow total perimeter bounds
        return (attacker.radius > victim.radius && dist < (attacker.radius - victim.radius));
    },

    GENERATE_FOOD_BURST: function(x, y, color) {
        for(let i=0; i<3; i++) {
            this.PARTICLES.push({
                x, y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                radius: Math.random() * 2 + 1,
                color, alpha: 1, decay: 0.04
            });
        }
    },

    GENERATE_EXPLOSION_PARTICLES: function(x, y, color) {
        // INJECT RIPPLE SHOCKWAVE EXTENT HOOKS
        this.SHOCKWAVES.push({ x, y, radius: 10, speed: 6, maxRadius: this.PLAYER.radius * 3, color, alpha: 1 });
        
        for (let i = 0; i < 35; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 3;
            this.PARTICLES.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 5 + 2,
                color, alpha: 1, decay: 0.015
            });
        }
    },

    TRIGGER_ELIMINATION_CINEMATIC: function() {
        this.IS_PLAYING = false;
        this.TARGET_ZOOM = 0.6;
        this.GENERATE_EXPLOSION_PARTICLES(this.PLAYER.x, this.PLAYER.y, this.PLAYER.color);
        socket.emit('player_eliminated', { roomId: this.ROOM_ID, x: this.PLAYER.x, y: this.PLAYER.y, color: this.PLAYER.color });
        
        document.getElementById('final-score').innerText = this.PLAYER.score.toLocaleString();
        
        setTimeout(() => {
            UI_ENGINE.OPEN_EXCLUSIVE_OVERLAY('modal-elimination');
        }, 1000);
    },

    REQUEST_RESPAWN_CYCLE: function() {
        UI_ENGINE.CLOSE_EXCLUSIVE_MODALS();
        this.PLAYER.x = window.innerWidth / 2;
        this.PLAYER.y = window.innerHeight / 2;
        this.EXECUTE_SPAWN_SEQUENCE();
    },

    ABORT_MATCH_TO_LOBBY: function() {
        UI_ENGINE.CLOSE_EXCLUSIVE_MODALS();
        document.getElementById('gameplay-hud').classList.remove('active');
        UI_ENGINE.EXECUTE_ROUTE('MAIN_LOBBY');
    },

    SPIN_LUCKY_WHEEL: function() {
        const wheel = document.getElementById('wheel-graphic');
        let angle = 0;
        const spinTime = setInterval(() => {
            angle += 45;
            wheel.style.transform = `rotate(${angle}deg)`;
        }, 50);
        setTimeout(() => { clearInterval(spinTime); alert("REWARD UNLOCKED: 500 COINS"); }, 2000);
    },

    RENDER_GRAPHICS_LAYERS: function(timestamp) {
        // LAYER 1: DRAW STREAM-QUALITY TOPOGRAPHIC CONTOURS
        this.bgCtx.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
        this.bgCtx.save();
        const bgSpeed = parseFloat(this.bgCanvas.getAttribute('data-speed'));
        this.bgCtx.translate(-this.PARALLAX_OFFSET.x * bgSpeed, -this.PARALLAX_OFFSET.y * bgSpeed);
        
        this.bgCtx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--topo-line-color').trim();
        this.bgCtx.lineWidth = 1.5;
        
        const timeShift = timestamp * 0.015;
        for (let r = 40; r < Math.max(window.innerWidth, window.innerHeight) * 1.5; r += 60) {
            this.bgCtx.beginPath();
            for (let theta = 0; theta < Math.PI * 2; theta += 0.05) {
                // Procedural contour wave mapping equations
                const rOffset = Math.sin(theta * 5 + timeShift) * 12 + Math.cos(theta * 3 - timeShift) * 8;
                const currentRadius = r + rOffset;
                const cx = window.innerWidth / 2 + Math.cos(theta) * currentRadius;
                const cy = window.innerHeight / 2 + Math.sin(theta) * currentRadius;
                if (theta === 0) this.bgCtx.moveTo(cx, cy); else this.bgCtx.lineTo(cx, cy);
            }
            this.bgCtx.closePath();
            this.bgCtx.stroke();
        }
        this.bgCtx.restore();

        // LAYER 3: DRAW ACTIVE CELL PLATFORM COMPONENT MODEL ARRAYS
        this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
        this.gameCtx.save();
        
        // Pin world focus transformations directly around core runtime player boundaries
        const gameSpeed = parseFloat(this.gameCanvas.getAttribute('data-speed'));
        this.gameCtx.translate(window.innerWidth / 2, window.innerHeight / 2);
        this.gameCtx.scale(this.CAMERA_ZOOM, this.CAMERA_ZOOM);
        this.gameCtx.translate(-this.PLAYER.x - (this.PARALLAX_OFFSET.x * gameSpeed), -this.PLAYER.y - (this.PARALLAX_OFFSET.y * gameSpeed));

        // DRAW FOOD OBJECT ELEMENTS
        this.FOOD.forEach(f => {
            this.gameCtx.fillStyle = f.color;
            this.gameCtx.beginPath();
            this.gameCtx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
            this.gameCtx.fill();
        });

        // DRAW SYNTHETIC NON-PLAYER AI TARGET NODES
        if (this.CURRENT_MODE === 'BOT_MATCH') {
            this.BOTS.forEach(bot => {
                this.gameCtx.fillStyle = bot.color;
                this.gameCtx.beginPath();
                this.gameCtx.arc(bot.x, bot.y, bot.radius, 0, Math.PI * 2);
                this.gameCtx.fill();
                
                // Typography markings for AI entities
                this.gameCtx.fillStyle = "rgba(255,255,255,0.7)";
                this.gameCtx.font = "bold 12px Orbitron";
                this.gameCtx.textAlign = "center";
                this.gameCtx.fillText("COMP_AI", bot.x, bot.y + 4);
            });
        }

        // DRAW EXPLOSIVE EMISSION PARTICLES INTERFACES
        this.PARTICLES.forEach(p => {
            this.gameCtx.save();
            this.gameCtx.globalAlpha = p.alpha;
            this.gameCtx.fillStyle = p.color;
            this.gameCtx.beginPath();
            this.gameCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.gameCtx.fill();
            this.gameCtx.restore();
        });

        // DRAW EXPANDING COMPRESSION COMPONENT SHOCKWAVES
        this.SHOCKWAVES.forEach(sw => {
            this.gameCtx.save();
            this.gameCtx.globalAlpha = sw.alpha;
            this.gameCtx.strokeStyle = sw.color;
            this.gameCtx.lineWidth = 3;
            this.gameCtx.beginPath();
            this.gameCtx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            this.gameCtx.stroke();
            this.gameCtx.restore();
        });

        // DRAW PRIMARY CLIENT ATOMIC ENTITY (PLAYER CELL)
        if (this.IS_PLAYING) {
            this.gameCtx.fillStyle = this.PLAYER.color;
            this.gameCtx.shadowColor = this.PLAYER.color;
            this.gameCtx.shadowBlur = this.PLAYER.protected ? 30 : 15;
            this.gameCtx.beginPath();
            this.gameCtx.arc(this.PLAYER.x, this.PLAYER.y, this.PLAYER.radius, 0, Math.PI * 2);
            this.gameCtx.fill();
            this.gameCtx.shadowBlur = 0; // Terminate contextual global rendering filters instantly

            // Apply energy matrix visual indicators during dynamic protective frames
            if(this.PLAYER.protected) {
                this.gameCtx.strokeStyle = "#ffffff";
                this.gameCtx.lineWidth = 4;
                this.gameCtx.beginPath();
                this.gameCtx.arc(this.PLAYER.x, this.PLAYER.y, this.PLAYER.radius + 6, 0, Math.PI * 2);
                this.gameCtx.stroke();
            }
        }

        this.gameCtx.restore();
    }
};

// INITIALIZE SYSTEM SUBSYSTEM COMPONENTS
document.addEventListener('DOMContentLoaded', () => GAME_ENGINE.INITIALIZE());
