'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RotateCcw, Play, Trophy } from 'lucide-react'

const CANVAS_W = 800
const CANVAS_H = 400
const GROUND_Y = 320
const GRAVITY = 0.6
const JUMP_FORCE = -11
const GAME_SPEED_INITIAL = 4
const SPAWN_INTERVAL_INITIAL = 90

// Pixel character colors
const SKIN = '#FFD5A0'
const HAIR = '#5C3A1E'
const SHIRT = '#C0392B'
const PANTS = '#2C3E50'
const SHOES = '#1A1A2E'

interface Obstacle {
  x: number
  type: 'crate' | 'barrel' | 'pillar'
  w: number
  h: number
}

interface Collectible {
  x: number
  y: number
  collected: boolean
  angle: number
}

function drawPixelPerson(ctx: CanvasRenderingContext2D, x: number, y: number, frame: number, jumping: boolean) {
  const s = 3 // pixel scale

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.15)'
  ctx.beginPath()
  ctx.ellipse(x + 8 * s, GROUND_Y + 2, 10 * s, 3, 0, 0, Math.PI * 2)
  ctx.fill()

  const bobY = jumping ? 0 : Math.sin(frame * 0.3) * 2

  // Shoes
  ctx.fillStyle = SHOES
  if (jumping) {
    ctx.fillRect(x + 2 * s, y + 17 * s + bobY, 4 * s, 2 * s)
    ctx.fillRect(x + 8 * s, y + 15 * s + bobY, 4 * s, 2 * s)
  } else {
    const legOffset = Math.sin(frame * 0.3) * 3
    ctx.fillRect(x + 2 * s + legOffset, y + 17 * s + bobY, 4 * s, 2 * s)
    ctx.fillRect(x + 8 * s - legOffset, y + 17 * s + bobY, 4 * s, 2 * s)
  }

  // Pants
  ctx.fillStyle = PANTS
  ctx.fillRect(x + 2 * s, y + 13 * s + bobY, 4 * s, 4 * s)
  ctx.fillRect(x + 8 * s, y + 13 * s + bobY, 4 * s, 4 * s)
  ctx.fillRect(x + 2 * s, y + 12 * s + bobY, 10 * s, 2 * s)

  // Shirt
  ctx.fillStyle = SHIRT
  ctx.fillRect(x + 2 * s, y + 6 * s + bobY, 10 * s, 6 * s)
  // Arms
  if (jumping) {
    ctx.fillRect(x - 1 * s, y + 4 * s + bobY, 3 * s, 3 * s)
    ctx.fillRect(x + 12 * s, y + 4 * s + bobY, 3 * s, 3 * s)
  } else {
    const armSwing = Math.sin(frame * 0.3) * 2
    ctx.fillRect(x - 1 * s, y + 7 * s + bobY + armSwing, 3 * s, 5 * s)
    ctx.fillRect(x + 12 * s, y + 7 * s + bobY - armSwing, 3 * s, 5 * s)
  }
  // Hands
  ctx.fillStyle = SKIN
  if (jumping) {
    ctx.fillRect(x - 1 * s, y + 3 * s + bobY, 3 * s, 2 * s)
    ctx.fillRect(x + 12 * s, y + 3 * s + bobY, 3 * s, 2 * s)
  }

  // Head
  ctx.fillStyle = SKIN
  ctx.fillRect(x + 3 * s, y + 1 * s + bobY, 8 * s, 6 * s)

  // Hair
  ctx.fillStyle = HAIR
  ctx.fillRect(x + 2 * s, y + 0 * s + bobY, 10 * s, 2 * s)
  ctx.fillRect(x + 2 * s, y + 1 * s + bobY, 2 * s, 3 * s)

  // Eyes
  ctx.fillStyle = '#222'
  ctx.fillRect(x + 6 * s, y + 3 * s + bobY, 1.5 * s, 1.5 * s)
  ctx.fillRect(x + 9 * s, y + 3 * s + bobY, 1.5 * s, 1.5 * s)

  // Mouth
  ctx.fillStyle = '#C0392B'
  ctx.fillRect(x + 7 * s, y + 5 * s + bobY, 2 * s, 0.5 * s)
}

function drawGear(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, size: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)

  const teeth = 8
  const outerR = size
  const innerR = size * 0.65

  ctx.fillStyle = '#D4A017'
  ctx.strokeStyle = '#B8860B'
  ctx.lineWidth = 1.5

  ctx.beginPath()
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i * Math.PI) / teeth
    const r = i % 2 === 0 ? outerR : innerR
    if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
    else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Center hole
  ctx.fillStyle = '#8B6914'
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle) {
  if (obs.type === 'crate') {
    ctx.fillStyle = '#8B5E3C'
    ctx.fillRect(obs.x, GROUND_Y - obs.h, obs.w, obs.h)
    ctx.strokeStyle = '#6B3E1C'
    ctx.lineWidth = 2
    ctx.strokeRect(obs.x, GROUND_Y - obs.h, obs.w, obs.h)
    // Cross lines
    ctx.beginPath()
    ctx.moveTo(obs.x, GROUND_Y - obs.h)
    ctx.lineTo(obs.x + obs.w, GROUND_Y)
    ctx.moveTo(obs.x + obs.w, GROUND_Y - obs.h)
    ctx.lineTo(obs.x, GROUND_Y)
    ctx.stroke()
    // Label
    ctx.fillStyle = '#6B3E1C'
    ctx.font = 'bold 10px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('MUSEE', obs.x + obs.w / 2, GROUND_Y - obs.h / 2 + 4)
  } else if (obs.type === 'barrel') {
    ctx.fillStyle = '#6B4226'
    const cx = obs.x + obs.w / 2
    ctx.beginPath()
    ctx.ellipse(cx, GROUND_Y - obs.h / 2, obs.w / 2, obs.h / 2, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#4A2C16'
    ctx.lineWidth = 2
    ctx.stroke()
    // Bands
    ctx.strokeStyle = '#D4A017'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.ellipse(cx, GROUND_Y - obs.h / 2 - obs.h * 0.2, obs.w / 2 - 2, 4, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(cx, GROUND_Y - obs.h / 2 + obs.h * 0.2, obs.w / 2 - 2, 4, 0, 0, Math.PI * 2)
    ctx.stroke()
  } else {
    // Pillar
    ctx.fillStyle = '#7F8C8D'
    ctx.fillRect(obs.x, GROUND_Y - obs.h, obs.w, obs.h)
    ctx.fillStyle = '#95A5A6'
    ctx.fillRect(obs.x - 4, GROUND_Y - obs.h, obs.w + 8, 8)
    ctx.fillRect(obs.x - 4, GROUND_Y - 8, obs.w + 8, 8)
    // Lines
    ctx.strokeStyle = '#6B7B7D'
    ctx.lineWidth = 1
    for (let i = 1; i < 3; i++) {
      ctx.beginPath()
      ctx.moveTo(obs.x + (obs.w / 3) * i, GROUND_Y - obs.h + 8)
      ctx.lineTo(obs.x + (obs.w / 3) * i, GROUND_Y - 8)
      ctx.stroke()
    }
  }
}

function drawBuilding(ctx: CanvasRenderingContext2D, x: number, w: number, h: number, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(x, GROUND_Y - h, w, h)
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'
  ctx.lineWidth = 1
  ctx.strokeRect(x, GROUND_Y - h, w, h)
  // Windows
  const wSize = 10
  const cols = Math.floor((w - 12) / 18)
  const rows = Math.floor((h - 20) / 18)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = 'rgba(255,235,180,0.7)'
      ctx.fillRect(x + 8 + c * 18, GROUND_Y - h + 12 + r * 18, wSize, wSize)
    }
  }
  // Door
  ctx.fillStyle = '#5C3A1E'
  ctx.fillRect(x + w / 2 - 8, GROUND_Y - 24, 16, 24)
}

export default function MuseumRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const gameRef = useRef({
    playerY: GROUND_Y - 19 * 3,
    velocityY: 0,
    isJumping: false,
    frame: 0,
    obstacles: [] as Obstacle[],
    collectibles: [] as Collectible[],
    spawnTimer: 0,
    collectibleTimer: 0,
    score: 0,
    gameSpeed: GAME_SPEED_INITIAL,
    buildings: [
      { x: 50, w: 80, h: 120, color: '#BDC3C7' },
      { x: 180, w: 60, h: 90, color: '#D5DBDB' },
      { x: 300, w: 100, h: 150, color: '#AEB6BF' },
      { x: 460, w: 70, h: 100, color: '#CCD1D1' },
      { x: 580, w: 90, h: 130, color: '#B2BABB' },
      { x: 720, w: 80, h: 110, color: '#D0D3D4' },
    ],
    roadMarkings: Array.from({ length: 12 }, (_, i) => i * 70),
  })
  const animRef = useRef<number>(0)

  const jump = useCallback(() => {
    const g = gameRef.current
    if (!g.isJumping) {
      g.velocityY = JUMP_FORCE
      g.isJumping = true
    }
  }, [])

  const startGame = useCallback(() => {
    const g = gameRef.current
    g.playerY = GROUND_Y - 19 * 3
    g.velocityY = 0
    g.isJumping = false
    g.frame = 0
    g.obstacles = []
    g.collectibles = []
    g.spawnTimer = 0
    g.collectibleTimer = 0
    g.score = 0
    g.gameSpeed = GAME_SPEED_INITIAL
    g.roadMarkings = Array.from({ length: 12 }, (_, i) => i * 70)
    setScore(0)
    setGameState('playing')
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function handleKey(e: KeyboardEvent) {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && gameState === 'playing') {
        e.preventDefault()
        jump()
      }
      if (e.code === 'Space' && gameState === 'idle') {
        startGame()
      }
      if (e.code === 'Space' && gameState === 'over') {
        startGame()
      }
    }

    function handleTouch() {
      if (gameState === 'playing') jump()
      if (gameState === 'idle' || gameState === 'over') startGame()
    }

    window.addEventListener('keydown', handleKey)
    canvas.addEventListener('pointerdown', handleTouch)

    if (gameState === 'playing') {
      function gameLoop() {
        if (!ctx || !canvas) return
        const g = gameRef.current
        g.frame++

        // Increase speed over time
        g.gameSpeed = GAME_SPEED_INITIAL + g.frame * 0.002

        // Physics
        g.velocityY += GRAVITY
        g.playerY += g.velocityY
        if (g.playerY >= GROUND_Y - 19 * 3) {
          g.playerY = GROUND_Y - 19 * 3
          g.velocityY = 0
          g.isJumping = false
        }

        // Spawn obstacles
        g.spawnTimer++
        const spawnInterval = Math.max(40, SPAWN_INTERVAL_INITIAL - g.frame * 0.02)
        if (g.spawnTimer >= spawnInterval) {
          g.spawnTimer = 0
          const types: Array<'crate' | 'barrel' | 'pillar'> = ['crate', 'barrel', 'pillar']
          const type = types[Math.floor(Math.random() * types.length)]
          const dims = {
            crate: { w: 35, h: 35 },
            barrel: { w: 30, h: 40 },
            pillar: { w: 24, h: 60 },
          }
          g.obstacles.push({ x: CANVAS_W + 20, type, ...dims[type] })
        }

        // Spawn collectibles
        g.collectibleTimer++
        if (g.collectibleTimer >= 55) {
          g.collectibleTimer = 0
          g.collectibles.push({
            x: CANVAS_W + 20,
            y: GROUND_Y - 80 - Math.random() * 80,
            collected: false,
            angle: 0,
          })
        }

        // Move obstacles
        g.obstacles = g.obstacles
          .map(o => ({ ...o, x: o.x - g.gameSpeed }))
          .filter(o => o.x > -60)

        // Move & rotate collectibles
        g.collectibles = g.collectibles
          .map(c => ({ ...c, x: c.x - g.gameSpeed, angle: c.angle + 0.04 }))
          .filter(c => c.x > -40)

        // Move road markings
        g.roadMarkings = g.roadMarkings.map(rx => {
          const newX = rx - g.gameSpeed
          return newX < -40 ? newX + 12 * 70 : newX
        })

        // Move buildings
        g.buildings = g.buildings.map(b => {
          const newX = b.x - g.gameSpeed * 0.3
          return { ...b, x: newX < -120 ? newX + CANVAS_W + 200 : newX }
        })

        // Player hitbox
        const px = 80
        const py = g.playerY
        const pw = 14 * 3
        const ph = 19 * 3

        // Collision check
        for (const obs of g.obstacles) {
          const ox = obs.x
          const oy = GROUND_Y - obs.h
          if (px + pw - 10 > ox && px + 10 < ox + obs.w && py + ph > oy && py < oy + obs.h) {
            setGameState('over')
            setHighScore(prev => Math.max(prev, g.score))
            return
          }
        }

        // Collect gears
        for (const col of g.collectibles) {
          if (!col.collected) {
            const dx = (px + pw / 2) - col.x
            const dy = (py + ph / 2) - col.y
            if (Math.sqrt(dx * dx + dy * dy) < 35) {
              col.collected = true
              g.score += 10
              setScore(g.score)
            }
          }
        }

        // Distance score
        if (g.frame % 10 === 0) {
          g.score += 1
          setScore(g.score)
        }

        // ---- DRAW ----
        // Sky
        ctx.fillStyle = '#E8F0F2'
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

        // Clouds
        ctx.fillStyle = '#fff'
        const cloudOffset = -(g.frame * 0.4) % CANVAS_W
        for (let i = 0; i < 4; i++) {
          const cx = ((i * 220 + cloudOffset) % (CANVAS_W + 100)) - 50
          const cy = 40 + (i % 2) * 30
          ctx.beginPath()
          ctx.arc(cx, cy, 20, 0, Math.PI * 2)
          ctx.arc(cx + 25, cy - 5, 25, 0, Math.PI * 2)
          ctx.arc(cx + 50, cy, 20, 0, Math.PI * 2)
          ctx.fill()
        }

        // Background buildings
        for (const b of g.buildings) {
          drawBuilding(ctx, b.x, b.w, b.h, b.color)
        }

        // Sidewalk
        ctx.fillStyle = '#BDC3C7'
        ctx.fillRect(0, GROUND_Y - 4, CANVAS_W, 8)

        // Road
        ctx.fillStyle = '#4A4A4A'
        ctx.fillRect(0, GROUND_Y + 4, CANVAS_W, 80)

        // Road markings
        ctx.fillStyle = '#F1C40F'
        for (const rx of g.roadMarkings) {
          ctx.fillRect(rx, GROUND_Y + 40, 40, 4)
        }

        // Ground / trottoir line
        ctx.fillStyle = '#95A5A6'
        ctx.fillRect(0, GROUND_Y, CANVAS_W, 4)

        // Museum sign on a building
        const signBuilding = g.buildings[2]
        if (signBuilding) {
          ctx.fillStyle = '#2C3E50'
          const sw = 90
          const sh = 18
          const sx = signBuilding.x + signBuilding.w / 2 - sw / 2
          const sy = GROUND_Y - signBuilding.h - sh - 4
          ctx.fillRect(sx, sy, sw, sh)
          ctx.fillStyle = '#F1C40F'
          ctx.font = 'bold 10px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('ARTS & METIERS', sx + sw / 2, sy + 13)
        }

        // Obstacles
        for (const obs of g.obstacles) {
          drawObstacle(ctx, obs)
        }

        // Collectibles
        for (const col of g.collectibles) {
          if (!col.collected) {
            drawGear(ctx, col.x, col.y, col.angle, 14)
          }
        }

        // Player
        drawPixelPerson(ctx, px, py, g.frame, g.isJumping)

        // Score HUD
        ctx.fillStyle = 'rgba(0,0,0,0.5)'
        ctx.fillRect(CANVAS_W - 150, 10, 140, 36)
        ctx.fillStyle = '#F1C40F'
        ctx.font = 'bold 12px monospace'
        ctx.textAlign = 'left'
        drawGear(ctx, CANVAS_W - 134, 28, g.frame * 0.05, 8)
        ctx.fillStyle = '#fff'
        ctx.fillText(`Score: ${g.score}`, CANVAS_W - 118, 33)

        animRef.current = requestAnimationFrame(gameLoop)
      }
      animRef.current = requestAnimationFrame(gameLoop)
    }

    // Draw idle / game over
    if (gameState === 'idle' || gameState === 'over') {
      // Background
      ctx.fillStyle = '#E8F0F2'
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

      // Clouds
      ctx.fillStyle = '#fff'
      for (let i = 0; i < 4; i++) {
        const cx = 60 + i * 200
        const cy = 40 + (i % 2) * 30
        ctx.beginPath()
        ctx.arc(cx, cy, 20, 0, Math.PI * 2)
        ctx.arc(cx + 25, cy - 5, 25, 0, Math.PI * 2)
        ctx.arc(cx + 50, cy, 20, 0, Math.PI * 2)
        ctx.fill()
      }

      // Static buildings
      const staticBuildings = [
        { x: 50, w: 80, h: 120, color: '#BDC3C7' },
        { x: 180, w: 60, h: 90, color: '#D5DBDB' },
        { x: 300, w: 100, h: 150, color: '#AEB6BF' },
        { x: 460, w: 70, h: 100, color: '#CCD1D1' },
        { x: 580, w: 90, h: 130, color: '#B2BABB' },
        { x: 720, w: 80, h: 110, color: '#D0D3D4' },
      ]
      for (const b of staticBuildings) drawBuilding(ctx, b.x, b.w, b.h, b.color)

      // Ground
      ctx.fillStyle = '#BDC3C7'
      ctx.fillRect(0, GROUND_Y - 4, CANVAS_W, 8)
      ctx.fillStyle = '#4A4A4A'
      ctx.fillRect(0, GROUND_Y + 4, CANVAS_W, 80)
      ctx.fillStyle = '#F1C40F'
      for (let i = 0; i < 12; i++) ctx.fillRect(i * 70, GROUND_Y + 40, 40, 4)
      ctx.fillStyle = '#95A5A6'
      ctx.fillRect(0, GROUND_Y, CANVAS_W, 4)

      // Person standing
      drawPixelPerson(ctx, 80, GROUND_Y - 19 * 3, 0, false)

      // Some static gears
      drawGear(ctx, 400, 120, 0.3, 20)
      drawGear(ctx, 430, 145, -0.5, 14)
    }

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('keydown', handleKey)
      canvas.removeEventListener('pointerdown', handleTouch)
    }
  }, [gameState, jump, startGame])

  return (
    <div className="flex flex-col items-center gap-6">
      <Card className="border-2 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="block w-full max-w-[800px]"
          style={{ imageRendering: 'pixelated' }}
        />
      </Card>

      <div className="flex items-center gap-4">
        {gameState === 'idle' && (
          <Button size="lg" onClick={startGame} className="gap-2">
            <Play className="w-5 h-5" />
            Jouer
          </Button>
        )}
        {gameState === 'over' && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-mono">Score</p>
                <p className="text-3xl font-bold text-accent">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-mono flex items-center gap-1 justify-center">
                  <Trophy className="w-3.5 h-3.5" /> Meilleur
                </p>
                <p className="text-3xl font-bold text-foreground">{highScore}</p>
              </div>
            </div>
            <Button size="lg" onClick={startGame} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Rejouer
            </Button>
          </div>
        )}
        {gameState === 'playing' && (
          <p className="text-sm text-muted-foreground font-mono">
            Espace / Clic pour sauter
          </p>
        )}
      </div>
    </div>
  )
}
