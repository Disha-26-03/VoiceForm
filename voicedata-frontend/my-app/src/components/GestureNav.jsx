
import { useEffect, useRef, useState, useCallback } from 'react'

function GestureNav({ activePage, onNavigate }) {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const avatarCanvasRef = useRef(null)
    const [cameraOn, setCameraOn] = useState(false)
    const [status, setStatus] = useState('idle')
    const [gesture, setGesture] = useState(null) // 'point' | 'peace' | 'thumbs' | null
    const [hoveredItem, setHoveredItem] = useState(null)
    const [countdown, setCountdown] = useState(0)
    const handsRef = useRef(null)
    const cameraRef = useRef(null)
    const hoverTimerRef = useRef(null)
    const countdownIntervalRef = useRef(null)
    const lastGestureRef = useRef(null)
    const HOVER_DELAY = 1500

    const stopCamera = useCallback(() => {
        if (cameraRef.current) { try { cameraRef.current.stop() } catch(e) {} cameraRef.current = null }
        if (handsRef.current) { try { handsRef.current.close() } catch(e) {} handsRef.current = null }
        clearTimeout(hoverTimerRef.current)
        clearInterval(countdownIntervalRef.current)
        setCameraOn(false)
        setStatus('idle')
        setGesture(null)
        setHoveredItem(null)
        setCountdown(0)
        lastGestureRef.current = null
        ;[canvasRef, avatarCanvasRef].forEach(ref => {
            if (ref.current) ref.current.getContext('2d').clearRect(0, 0, ref.current.width, ref.current.height)
        })
    }, [])

    // ── Gesture Detection ──────────────────────────────────────────────────
    const detectGesture = (lm) => {
        // Finger tips: 4=thumb, 8=index, 12=middle, 16=ring, 20=pinky
        // Finger MCP: 2=thumb, 5=index, 9=middle, 13=ring, 17=pinky
        const fingerUp = (tip, pip) => lm[tip].y < lm[pip].y
        const thumbUp = lm[4].x < lm[3].x // mirrored

        const index = fingerUp(8, 6)
        const middle = fingerUp(12, 10)
        const ring = fingerUp(16, 14)
        const pinky = fingerUp(20, 18)
        const thumb = lm[4].y < lm[3].y

        // ☝️ Point — only index up
        if (index && !middle && !ring && !pinky) return 'point'

        // ✌️ Peace — index + middle up, rest down
        if (index && middle && !ring && !pinky) return 'peace'

        // 👍 Thumbs up — thumb up, all fingers down
        if (thumb && !index && !middle && !ring && !pinky) return 'thumbs'

        return null
    }

    // ── Draw Hand Avatar ───────────────────────────────────────────────────
    const drawHandAvatar = (lm, canvas) => {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const W = canvas.width, H = canvas.height
        const pt = (i) => ({ x: (1 - lm[i].x) * W, y: lm[i].y * H })

        // Connections
        const connections = [
            [0,1],[1,2],[2,3],[3,4],       // thumb
            [0,5],[5,6],[6,7],[7,8],       // index
            [0,9],[9,10],[10,11],[11,12],  // middle
            [0,13],[13,14],[14,15],[15,16],// ring
            [0,17],[17,18],[18,19],[19,20],// pinky
            [5,9],[9,13],[13,17]           // palm
        ]

        // Palm fill
        const palmPts = [0,1,5,9,13,17].map(i => pt(i))
        ctx.beginPath()
        ctx.moveTo(palmPts[0].x, palmPts[0].y)
        palmPts.forEach(p => ctx.lineTo(p.x, p.y))
        ctx.closePath()
        ctx.fillStyle = 'rgba(167,139,250,0.2)'
        ctx.fill()

        // Bones
        connections.forEach(([a, b]) => {
            const p1 = pt(a), p2 = pt(b)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = 'rgba(139,92,246,0.8)'
            ctx.lineWidth = 2.5
            ctx.stroke()
        })

        // Joints
        for (let i = 0; i < 21; i++) {
            const p = pt(i)
            ctx.beginPath()
            ctx.arc(p.x, p.y, i === 0 ? 7 : 4, 0, 2 * Math.PI)
            ctx.fillStyle = i === 8 ? '#60a5fa' : i === 0 ? '#f59e0b' : '#c4b5fd'
            ctx.fill()
        }
    }

    const startCountdown = useCallback((zoneId) => {
        setCountdown(HOVER_DELAY / 1000)
        clearInterval(countdownIntervalRef.current)
        countdownIntervalRef.current = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 0.1) { clearInterval(countdownIntervalRef.current); return 0 }
                return +(prev - 0.1).toFixed(1)
            })
        }, 100)

        hoverTimerRef.current = setTimeout(() => {
            onNavigate(zoneId)
            lastGestureRef.current = null
            setHoveredItem(null)
            setCountdown(0)
            clearInterval(countdownIntervalRef.current)
        }, HOVER_DELAY)
    }, [onNavigate])

    const onResults = useCallback((results) => {
        const canvas = canvasRef.current
        const avatarCanvas = avatarCanvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (!results.multiHandLandmarks?.length) {
            setGesture(null)
            setHoveredItem(null)
            clearTimeout(hoverTimerRef.current)
            clearInterval(countdownIntervalRef.current)
            setCountdown(0)
            lastGestureRef.current = null
            if (avatarCanvas) avatarCanvas.getContext('2d').clearRect(0, 0, avatarCanvas.width, avatarCanvas.height)
            return
        }

        const lm = results.multiHandLandmarks[0]

        // Draw avatar
        if (avatarCanvas) drawHandAvatar(lm, avatarCanvas)

        // Detect gesture
        const det = detectGesture(lm)
        setGesture(det)

        // Index finger tip position
        const x = 1 - lm[8].x
        const y = lm[8].y

        // Draw finger cursor on video canvas
        ctx.beginPath()
        ctx.arc(x * canvas.width, y * canvas.height, 12, 0, 2 * Math.PI)
        ctx.fillStyle = det === 'point' ? 'rgba(96,165,250,0.85)'
            : det === 'peace' ? 'rgba(167,139,250,0.85)'
            : det === 'thumbs' ? 'rgba(245,158,11,0.85)'
            : 'rgba(99,102,241,0.6)'
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.stroke()

        // ── Navigation logic ──
        // ✌️ Peace = All Entries (navigate directly)
        if (det === 'peace' && lastGestureRef.current !== 'peace-done') {
            lastGestureRef.current = 'peace-done'
            setHoveredItem('all-entries')
            clearTimeout(hoverTimerRef.current)
            clearInterval(countdownIntervalRef.current)
            startCountdown('all-entries')
            return
        }

        // ☝️ Point = New Entry (navigate directly)
        if (det === 'point' && lastGestureRef.current !== 'point-done') {
            lastGestureRef.current = 'point-done'
            setHoveredItem('new-entry')
            clearTimeout(hoverTimerRef.current)
            clearInterval(countdownIntervalRef.current)
            startCountdown('new-entry')
            return
        }

        // 👍 Thumbs = confirm current hover
        if (det === 'thumbs' && hoveredItem && lastGestureRef.current !== 'thumbs-done') {
            lastGestureRef.current = 'thumbs-done'
            onNavigate(hoveredItem)
            setHoveredItem(null)
            setCountdown(0)
            clearTimeout(hoverTimerRef.current)
            clearInterval(countdownIntervalRef.current)
            return
        }

        // Reset if no gesture
        if (!det) {
            lastGestureRef.current = null
            setHoveredItem(null)
            clearTimeout(hoverTimerRef.current)
            clearInterval(countdownIntervalRef.current)
            setCountdown(0)
        }

    }, [onNavigate, hoveredItem, startCountdown])

    const startCamera = async () => {
        if (cameraOn) { stopCamera(); return }
        if (!window.Hands || !window.Camera) {
            alert('MediaPipe load nahi hua! Page refresh karo.')
            return
        }
        setStatus('loading')
        setCameraOn(true)
    }

    useEffect(() => {
        if (!cameraOn || status !== 'loading') return
        const init = async () => {
            await new Promise(r => setTimeout(r, 150))
            if (!videoRef.current) { setStatus('error'); setCameraOn(false); return }
            try {
                const hands = new window.Hands({
                    locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
                })
                hands.setOptions({ maxNumHands: 1, modelComplexity: 0, minDetectionConfidence: 0.7, minTrackingConfidence: 0.6 })
                hands.onResults(onResults)
                handsRef.current = hands

                const cam = new window.Camera(videoRef.current, {
                    onFrame: async () => {
                        if (handsRef.current && videoRef.current)
                            await handsRef.current.send({ image: videoRef.current })
                    },
                    width: 280, height: 210
                })
                await cam.start()
                cameraRef.current = cam
                setStatus('ready')
            } catch(e) { console.error(e); setStatus('error'); setCameraOn(false) }
        }
        init()
    }, [cameraOn, status, onResults])

    useEffect(() => () => stopCamera(), [stopCamera])

    const gestureEmoji = { point: '☝️', peace: '✌️', thumbs: '👍' }
    const gestureLabel = { point: 'New Entry', peace: 'All Entries', thumbs: 'Confirm!' }

    return (
        <div style={styles.wrapper}>
            <button onClick={startCamera} style={{
                ...styles.camBtn,
                background: cameraOn ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
                boxShadow: cameraOn ? '0 0 16px rgba(239,68,68,0.4)' : '0 0 16px rgba(139,92,246,0.4)'
            }}>
                {status === 'loading' ? '⏳' : cameraOn ? '📷 OFF' : '🖐️ Gesture'}
            </button>

            {cameraOn && (
                <div style={styles.panel}>
                    {/* Video feed */}
                    <div style={styles.videoBox}>
                        <video ref={videoRef} style={styles.video} autoPlay playsInline muted />
                        <canvas ref={canvasRef} width={280} height={210} style={styles.overlay} />
                        <div style={styles.statusDot}>
                            {status === 'ready' ? '🟢' : '🟡'} {status}
                        </div>
                    </div>

                    {/* Hand Avatar */}
                    <div style={styles.avatarBox}>
                        <p style={styles.avatarLabel}>🖐️ Hand Tracker</p>
                        <canvas ref={avatarCanvasRef} width={200} height={160} style={styles.avatarCanvas} />
                    </div>

                    {/* Gesture status */}
                    <div style={styles.gestureStatus}>
                        {gesture ? (
                            <div style={styles.gestureDetected}>
                                <span style={styles.gestureEmoji}>{gestureEmoji[gesture]}</span>
                                <span style={styles.gestureText}>{gestureLabel[gesture]}</span>
                            </div>
                        ) : (
                            <p style={styles.gestureNone}>No gesture detected</p>
                        )}
                    </div>

                    {/* Countdown */}
                    {countdown > 0 && (
                        <div style={styles.countdownBox}>
                            <div style={styles.countdownTrack}>
                                <div style={{
                                    ...styles.countdownFill,
                                    width: `${(1 - countdown / (HOVER_DELAY / 1000)) * 100}%`
                                }} />
                            </div>
                            <p style={styles.countdownText}>Navigating in {countdown.toFixed(1)}s...</p>
                        </div>
                    )}

                    {/* Nav zones */}
                    <div style={styles.zones}>
                        {[
                            { id: 'new-entry',   label: '📝 New Entry',   gesture: '☝️ Point' },
                            { id: 'all-entries', label: '📋 All Entries', gesture: '✌️ Peace' },
                            
                        ].map(z => (
                            <div key={z.id} style={{
                                ...styles.zone,
                                background: hoveredItem === z.id ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.06)',
                                border: `1.5px solid ${hoveredItem === z.id ? '#818cf8' : 'rgba(255,255,255,0.12)'}`,
                                transform: hoveredItem === z.id ? 'scale(1.03)' : 'scale(1)'
                            }}>
                                <span style={styles.zoneLabel}>{z.label}</span>
                                <span style={styles.zoneGesture}>{z.gesture}</span>
                            </div>
                        ))}
                    </div>

                    {/* Guide */}
                    <div style={styles.guide}>
                        <p style={styles.guideTitle}>How to use:</p>
                        <p style={styles.guideItem}>☝️ <b>Point</b> → New Entry</p>
                        <p style={styles.guideItem}>✌️ <b>Peace</b> → All Entries</p>
                        <p style={styles.guideItem}>👍 <b>Thumbs up</b> → Confirm</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const styles = {
    wrapper: { padding: '8px 12px' },
    camBtn: { width: '100%', padding: '10px', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', transition: 'all 0.3s', marginBottom: '6px' },
    panel: { display: 'flex', flexDirection: 'column', gap: '8px' },
    videoBox: { position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '2px solid rgba(139,92,246,0.5)' },
    video: { width: '100%', display: 'block', transform: 'scaleX(-1)' },
    overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' },
    statusDot: { position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '2px 7px', borderRadius: '20px', fontSize: '10px' },
    avatarBox: { background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '8px', textAlign: 'center', border: '1px solid rgba(139,92,246,0.3)' },
    avatarLabel: { margin: '0 0 4px', color: '#c4b5fd', fontSize: '11px', fontWeight: '600' },
    avatarCanvas: { width: '100%', height: 'auto', borderRadius: '8px' },
    gestureStatus: { textAlign: 'center', minHeight: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    gestureDetected: { display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.25)', padding: '6px 14px', borderRadius: '20px', border: '1px solid #818cf8' },
    gestureEmoji: { fontSize: '22px' },
    gestureText: { color: '#c4b5fd', fontSize: '13px', fontWeight: '700' },
    gestureNone: { color: 'rgba(255,255,255,0.3)', fontSize: '11px', margin: 0 },
    countdownBox: { background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '8px 10px' },
    countdownTrack: { height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', overflow: 'hidden', marginBottom: '4px' },
    countdownFill: { height: '100%', background: 'linear-gradient(90deg,#a78bfa,#60a5fa)', borderRadius: '10px', transition: 'width 0.1s linear' },
    countdownText: { color: '#c4b5fd', fontSize: '11px', margin: 0, textAlign: 'center' },
    zones: { display: 'flex', flexDirection: 'column', gap: '5px' },
    zone: { padding: '8px 10px', borderRadius: '8px', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    zoneLabel: { color: '#fff', fontSize: '12px', fontWeight: '600' },
    zoneGesture: { color: '#a78bfa', fontSize: '11px' },
    guide: { background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.08)' },
    guideTitle: { color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '700', letterSpacing: '1px', margin: '0 0 4px', textTransform: 'uppercase' },
    guideItem: { color: 'rgba(255,255,255,0.75)', fontSize: '11px', margin: '2px 0' }
}

export default GestureNav