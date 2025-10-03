// import { useRef, useState } from "react";
// import { Play, Pause, Volume2, Volume1, VolumeX, Radio } from "lucide-react";

// // ✅ Clean URLs (no trailing spaces)
// const STATIONS = [
//   { name: "FIP Radio (France)", url: "https://icecast.radiofrance.fr/fip-midfi.mp3" },
//   { name: "KEXP Seattle (USA)", url: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3" },
//   { name: "Radio Swiss Jazz (Switzerland)", url: "https://stream.srg-ssr.ch/m/rsj/mp3_128" },
//   { name: "Radio Paradise (USA)", url: "https://stream.radioparadise.com/mp3-128" },
//   { name: "Deutschlandfunk (Germany)", url: "https://st01.dlf.de/dlf/01/128/mp3/stream.mp3" },
// ];

// function App() {
//   const audioRef = useRef(null);
//   const [currentStation, setCurrentStation] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.7); // 70%

//   const toggleStation = (station) => {
//     const cleanUrl = station.url.trim();

//     if (currentStation?.url.trim() === cleanUrl) {
//       if (isPlaying) {
//         audioRef.current?.pause();
//         setIsPlaying(false);
//       } else {
//         const playPromise = audioRef.current?.play();
//         if (playPromise !== undefined) {
//           playPromise.catch((err) => {
//             if (err.name !== "AbortError") {
//               console.error("Play error:", err);
//             }
//           });
//         }
//         setIsPlaying(true);
//       }
//     } else {
//       if (isPlaying) {
//         audioRef.current?.pause();
//       }

//       setCurrentStation(station);
//       audioRef.current.src = cleanUrl;
//       audioRef.current.load();

//       const playPromise = audioRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => setIsPlaying(true))
//           .catch((err) => {
//             if (err.name !== "AbortError") {
//               console.error("Playback failed:", err);
//             }
//           });
//       }
//     }
//   };

//   const togglePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current?.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current?.play().catch((err) => {
//         if (err.name !== "AbortError") {
//           console.error("Play error:", err);
//         }
//       });
//       setIsPlaying(true);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     audioRef.current.volume = newVolume;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white flex flex-col items-center justify-center p-6 md:p-10 lg:p-14 relative overflow-hidden">
//       {/* Animated Background Dots */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `
//               radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
//               radial-gradient(circle at 75% 75%, white 2px, transparent 2px),
//               radial-gradient(circle at 50% 50%, white 3px, transparent 3px)
//             `,
//             backgroundSize: "50px 50px",
//             animation: "pulse 8s infinite ease-in-out",
//           }}
//         ></div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.1; }
//           50% { opacity: 0.15; }
//         }
//       `}</style>

//       {/* Logo & Title */}
//       <div className="text-center mb-10 z-10">
//         <div className="flex justify-center mb-6">
//           <div className="relative group">
//             <Radio className="w-20 h-20 text-yellow-400 animate-spin-slow" />
//             <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-20 animate-ping"></div>
//           </div>
//         </div>
//         <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight tracking-tighter">
//           Global Radio
//         </h1>
//         <p className="text-gray-300 mt-3 text-lg max-w-xl mx-auto leading-relaxed">
//           Tune in live from Paris, Seattle, Zurich, Berlin & beyond 🌍
//         </p>
//       </div>

//       {/* Now Playing Card */}
//       {currentStation && (
//         <div className="w-full max-w-md mb-8 z-10">
//           <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-6 text-center transform transition-all hover:scale-105">
//             <h2 className="text-lg font-semibold text-gray-200 mb-2">Now Playing</h2>
//             <p className="text-xl font-bold text-yellow-300 truncate">{currentStation.name}</p>
//             <div className="flex justify-center items-center gap-2 mt-3">
//               {isPlaying ? (
//                 <>
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   <span className="text-green-400 text-sm font-medium">Live Stream</span>
//                 </>
//               ) : (
//                 <>
//                   <div className="w-2 h-2 bg-red-400 rounded-full"></div>
//                   <span className="text-red-400 text-sm font-medium">Paused</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Volume Control */}
//       <div className="w-full max-w-md mb-8 z-10">
//         <label className="block text-gray-300 text-sm font-medium mb-2">
//           Volume
//         </label>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => {
//               audioRef.current.volume = 0;
//               setVolume(0);
//             }}
//             className="p-2 text-gray-400 hover:text-white transition"
//           >
//             <VolumeX size={20} />
//           </button>
//           <button
//             onClick={() => {
//               audioRef.current.volume = 0.5;
//               setVolume(0.5);
//             }}
//             className="p-2 text-gray-400 hover:text-white transition"
//           >
//             <Volume1 size={20} />
//           </button>
//           <button
//             onClick={() => {
//               audioRef.current.volume = 1;
//               setVolume(1);
//             }}
//             className="p-2 text-gray-400 hover:text-white transition"
//           >
//             <Volume2 size={20} />
//           </button>
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.01"
//             value={volume}
//             onChange={handleVolumeChange}
//             className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
//             style={{
//               background: `linear-gradient(to right, #ffcc00 ${volume * 100}%, #333 ${volume * 100}%)`,
//             }}
//           />
//         </div>
//       </div>

//       {/* Stations List */}
//       <div className="w-full max-w-3xl z-10 space-y-4">
//         {STATIONS.map((station, i) => {
//           const isCurrent = currentStation?.url.trim() === station.url.trim();
//           const isPlayingNow = isCurrent && isPlaying;

//           return (
//             <div
//               key={i}
//               className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 group
//                 ${isCurrent
//                   ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-2xl scale-105 ring-2 ring-yellow-400"
//                   : "bg-white/8 backdrop-blur-sm bg-opacity-10 hover:bg-opacity-20 hover:shadow-xl hover:shadow-yellow-500/10"
//                 }`}
//             >
//               {/* Station Name */}
//               <span className="text-lg font-semibold truncate flex-1">
//                 {station.name}
//               </span>

//               {/* Play/Pause Button */}
//               <button
//                 onClick={() => toggleStation(station)}
//                 className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 min-w-[100px] justify-center transition-transform
//                   ${isPlayingNow
//                     ? "bg-red-600 hover:bg-red-700 text-white transform hover:scale-105"
//                     : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105"
//                   } shadow-lg hover:shadow-green-500/25`}
//               >
//                 {isPlayingNow ? (
//                   <>
//                     <Pause size={18} /> Pause
//                   </>
//                 ) : (
//                   <>
//                     <Play size={18} /> Play
//                   </>
//                 )}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* Hidden Audio Element */}
//       <audio ref={audioRef} preload="auto" />

//       {/* Footer */}
//       <p className="text-gray-500 text-sm mt-12 z-10 text-center opacity-80 max-w-xs">
//         Streaming live from around the world • One Radio Check
//       </p>
//     </div>
//   );
// }

// export default App;

// import { useRef, useState, useEffect } from "react";
// import { Play, Pause, Volume2, Volume1, VolumeX, Radio } from "lucide-react";

// // 🌍 Country Flags
// const COUNTRY_FLAGS = {
//   FR: "🇫🇷",
//   US: "🇺🇸",
//   CH: "🇨🇭",
//   DE: "🇩🇪",
// };

// // ✅ Stations
// const STATIONS = [
//   { id: "fip", name: "FIP Radio (France)", url: "https://icecast.radiofrance.fr/fip-midfi.mp3", country: "FR" },
//   { id: "kexp", name: "KEXP Seattle (USA)", url: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3", country: "US" },
//   { id: "swiss", name: "Radio Swiss Jazz (Switzerland)", url: "https://stream.srg-ssr.ch/m/rsj/mp3_128", country: "CH" },
//   { id: "paradise", name: "Radio Paradise (USA)", url: "https://stream.radioparadise.com/mp3-128", country: "US" },
//   { id: "dlf", name: "Deutschlandfunk (Germany)", url: "https://st01.dlf.de/dlf/01/128/mp3/stream.mp3", country: "DE" },
// ];

// function App() {
//   const audioRef = useRef(null);
//   const [currentStation, setCurrentStation] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.7);
//   const [artist, setArtist] = useState("Unknown Artist");
//   const [title, setTitle] = useState("Live Radio");

//   // Auto-resume last station
//   useEffect(() => {
//     const saved = localStorage.getItem("radio-state");
//     if (saved) {
//       const { stationId, isPlaying: playing } = JSON.parse(saved);
//       const station = STATIONS.find(s => s.id === stationId);
//       if (station) {
//         setCurrentStation(station);
//         if (playing) {
//           setTimeout(() => {
//             audioRef.current.src = station.url;
//             audioRef.current.volume = volume;
//             audioRef.current.play().catch(console.error);
//             setIsPlaying(true);
//           }, 100);
//         }
//       }
//     }
//   }, [volume]);

//   // Save state
//   useEffect(() => {
//     if (currentStation && isPlaying) {
//       localStorage.setItem("radio-state", JSON.stringify({
//         stationId: currentStation.id,
//         isPlaying: true
//       }));
//     }
//   }, [currentStation, isPlaying]);

//   // Fetch FIP metadata (artist/title)
//   useEffect(() => {
//     if (currentStation?.id === "fip") {
//       const fetchMeta = () => {
//         fetch("https://www.fip.fr/latest/api/graphql?operationName=GetLive&variables=%7B%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22a44c0356e7865e490870718e6e5be3e89a25355765301798963d934941488285%22%7D%7D")
//           .then(r => r.json())
//           .then(data => {
//             const item = data?.data?.live;
//             if (item) {
//               setArtist(item.artist);
//               setTitle(item.title);
//             }
//           })
//           .catch(() => {});
//       };

//       fetchMeta();
//       const interval = setInterval(fetchMeta, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [currentStation]);

//   const toggleStation = (station) => {
//     const cleanUrl = station.url.trim();

//     if (currentStation?.url.trim() === cleanUrl) {
//       if (isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         const playPromise = audioRef.current.play();
//         playPromise.catch((err) => {
//           if (err.name !== "AbortError") {
//             console.error("Play error:", err);
//           }
//         });
//         setIsPlaying(true);
//       }
//     } else {
//       if (isPlaying) {
//         audioRef.current.pause();
//       }

//       setCurrentStation(station);
//       audioRef.current.src = cleanUrl;
//       audioRef.current.volume = volume;
//       audioRef.current.load();

//       const playPromise = audioRef.current.play();
//       playPromise.catch((err) => {
//         if (err.name !== "AbortError") {
//           console.error("Playback failed:", err);
//         }
//       });
//       setIsPlaying(true);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Logo */}
//       <div style={styles.header}>
//         <Radio style={styles.logo} />
//         <h1 style={styles.title}>Global Radio</h1>
//         <p style={styles.subtitle}>Live from around the world 🌍</p>
//       </div>

//       {/* Now Playing */}
//       {currentStation && (
//         <div style={styles.nowPlaying}>
//           <p style={styles.nowPlayingName}>{currentStation.name}</p>
//           <p style={styles.nowPlayingMeta}>{artist} • {title}</p>
//           <p style={styles.status(isPlaying)}>
//             {isPlaying ? "▶️ Streaming" : "⏸ Paused"}
//           </p>
//         </div>
//       )}

//       {/* Volume */}
//       <div style={styles.volume}>
//         <label style={styles.label}>Volume</label>
//         <div style={styles.volumeRow}>
//           <VolumeX size={16} style={styles.volIcon} onClick={() => setVolume(0)} />
//           <Volume1 size={16} style={styles.volIcon} onClick={() => setVolume(0.5)} />
//           <Volume2 size={16} style={styles.volIcon} onClick={() => setVolume(1)} />
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.01"
//             value={volume}
//             onChange={handleVolumeChange}
//             style={styles.slider(volume)}
//           />
//         </div>
//       </div>

//       {/* Stations */}
//       <div style={styles.stations}>
//         {STATIONS.map((station) => {
//           const isCurrent = currentStation?.id === station.id;
//           const isPlayingNow = isCurrent && isPlaying;

//           return (
//             <div key={station.id} style={styles.station(isCurrent)}>
//               <div style={styles.stationInfo}>
//                 <span style={styles.flag}>{COUNTRY_FLAGS[station.country]}</span>
//                 <span style={styles.stationName}>{station.name}</span>
//               </div>
//               <button
//                 onClick={() => toggleStation(station)}
//                 style={styles.playButton(isPlayingNow)}
//               >
//                 {isPlayingNow ? <Pause size={14} /> : <Play size={14} />} {isPlayingNow ? " Pause" : " Play"}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       <p style={styles.footer}>
//         One Radio Check • Auto-resumes last station
//       </p>

//       <audio ref={audioRef} preload="auto" />
//     </div>
//   );
// }

// // ✅ Pure CSS Styles
// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #1a1a2e, #16213e)",
//     color: "#fff",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//     margin: 0,
//     boxSizing: "border-box",
//     textAlign: "center",
//     overflow: "auto",
//   },

//   header: {
//     marginBottom: "30px",
//   },

//   logo: {
//     width: "80px",
//     height: "80px",
//     color: "#fbbf24",
//     animation: "pulse 2s infinite",
//   },

//   title: {
//     fontSize: "2.5rem",
//     margin: "10px 0 5px",
//     background: "linear-gradient(90deg, #fbbf24, #3b82f6)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//   },

//   subtitle: {
//     fontSize: "1.1rem",
//     color: "#a0aec0",
//   },

//   nowPlaying: {
//     background: "rgba(255, 255, 255, 0.1)",
//     backdropFilter: "blur(10px)",
//     padding: "20px",
//     borderRadius: "16px",
//     maxWidth: "400px",
//     width: "100%",
//     marginBottom: "25px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//   },

//   nowPlayingName: {
//     fontSize: "1.3rem",
//     fontWeight: "bold",
//     color: "#fbbf24",
//     margin: 0,
//   },

//   nowPlayingMeta: {
//     fontSize: "0.95rem",
//     color: "#e2e8f0",
//     margin: "8px 0 0",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//   },

//   status: (isPlaying) => ({
//     fontSize: "0.85rem",
//     marginTop: "8px",
//     color: isPlaying ? "#10b981" : "#ef4444",
//   }),

//   volume: {
//     width: "100%",
//     maxWidth: "400px",
//     marginBottom: "30px",
//   },

//   label: {
//     display: "block",
//     fontSize: "0.9rem",
//     color: "#e2e8f0",
//     marginBottom: "8px",
//   },

//   volumeRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },

//   volIcon: {
//     cursor: "pointer",
//     color: "#a0aec0",
//   },

//   slider: (volume) => ({
//     flex: 1,
//     height: "6px",
//     borderRadius: "3px",
//     background: `linear-gradient(to right, #fbbf24 ${volume * 100}%, #333 ${volume * 100}%)`,
//     WebkitAppearance: "none",
//     border: "none",
//     cursor: "pointer",
//   }),

//   stations: {
//     width: "100%",
//     maxWidth: "600px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },

//   station: (isCurrent) => ({
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "16px",
//     borderRadius: "12px",
//     background: isCurrent
//       ? "linear-gradient(90deg, #f59e0b, #f97316)"
//       : "rgba(255, 255, 255, 0.08)",
//     backdropFilter: isCurrent ? "blur(10px)" : "none",
//     border: isCurrent ? "2px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
//     transition: "all 0.3s ease",
//     boxShadow: isCurrent ? "0 8px 20px rgba(251, 191, 36, 0.2)" : "0 2px 8px rgba(0,0,0,0.2)",
//     transform: isCurrent ? "scale(1.02)" : "scale(1)",
//   }),

//   stationInfo: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     flex: 1,
//     textAlign: "left",
//   },

//   flag: {
//     fontSize: "1.5rem",
//   },

//   stationName: {
//     fontSize: "1rem",
//     fontWeight: "500",
//   },

//   playButton: (isPlaying) => ({
//     backgroundColor: isPlaying ? "#ef4444" : "#10b981",
//     color: "#fff",
//     border: "none",
//     padding: "10px 16px",
//     borderRadius: "8px",
//     fontSize: "0.9rem",
//     fontWeight: "600",
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//     cursor: "pointer",
//     transition: "background 0.2s",
//   }),

//   footer: {
//     fontSize: "0.8rem",
//     color: "#718096",
//     marginTop: "30px",
//     textAlign: "center",
//   },
// };

// export default App;

// import { useRef, useState, useEffect } from "react";
// import { Play, Pause, Volume2, Volume1, VolumeX, Radio, Sun, Moon } from "lucide-react";

// // 🌍 Country Flags
// const COUNTRY_FLAGS = {
//   FR: "🇫🇷",
//   US: "🇺🇸",
//   CH: "🇨🇭",
//   DE: "🇩🇪",
// };

// // ✅ Stations
// const STATIONS = [
//   { id: "fip", name: "FIP Radio (France)", url: "https://icecast.radiofrance.fr/fip-midfi.mp3", country: "FR" },
//   { id: "kexp", name: "KEXP Seattle (USA)", url: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3", country: "US" },
//   { id: "swiss", name: "Radio Swiss Jazz (Switzerland)", url: "https://stream.srg-ssr.ch/m/rsj/mp3_128", country: "CH" },
//   { id: "paradise", name: "Radio Paradise (USA)", url: "https://stream.radioparadise.com/mp3-128", country: "US" },
//   { id: "dlf", name: "Deutschlandfunk (Germany)", url: "https://st01.dlf.de/dlf/01/128/mp3/stream.mp3", country: "DE" },
// ];

// function App() {
//   const audioRef = useRef(null);
//   const [currentStation, setCurrentStation] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.7);
//   const [artist, setArtist] = useState("Unknown Artist");
//   const [title, setTitle] = useState("Live Radio");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   // Inside your component, after useRef declarations
// const canvasRef = useRef(null);
// const audioContextRef = useRef(null);
// const analyserRef = useRef(null);
// const animationRef = useRef(null);

// // Add to useState
// const [isVisualizerActive, setIsVisualizerActive] = useState(false);

// // Add this function
// useEffect(() => {
//   if (!currentStation || !isPlaying) {
//     // Clean up when no station or paused
//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }
//     if (audioContextRef.current) {
//       audioContextRef.current.close();
//     }
//     audioContextRef.current = null;
//     analyserRef.current = null;
//     setIsVisualizerActive(false);
//     return;
//   }

//   // Only try to visualize if browser allows it
//   const setupVisualizer = async () => {
//     try {
//       const audioEl = audioRef.current;
//       const canvas = canvasRef.current;
//       if (!audioEl || !canvas) return;

//       const AudioContext = window.AudioContext || window.webkitAudioContext;
//       const ctx = new AudioContext();
//       const analyser = ctx.createAnalyser();
//       const source = ctx.createMediaElementSource(audioEl);

//       source.connect(analyser);
//       analyser.connect(ctx.destination);
//       analyser.fftSize = 128;

//       const bufferLength = analyser.frequencyBinCount;
//       const dataArray = new Uint8Array(bufferLength);

//       const canvasCtx = canvas.getContext('2d');
//       canvas.width = 300;
//       canvas.height = 80;

//       const draw = () => {
//         animationRef.current = requestAnimationFrame(draw);
//         analyser.getByteTimeDomainData(dataArray);

//         canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)';
//         canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
//         canvasCtx.lineWidth = 2;
//         canvasCtx.strokeStyle = '#fbbf24';

//         canvasCtx.beginPath();
//         const sliceWidth = canvas.width / bufferLength;
//         let x = 0;

//         for (let i = 0; i < bufferLength; i++) {
//           const v = dataArray[i] / 128.0;
//           const y = (v * canvas.height) / 2;

//           if (i === 0) {
//             canvasCtx.moveTo(x, y);
//           } else {
//             canvasCtx.lineTo(x, y);
//           }

//           x += sliceWidth;
//         }
//         canvasCtx.lineTo(canvas.width, canvas.height / 2);
//         canvasCtx.stroke();
//       };

//       draw();
//       audioContextRef.current = ctx;
//       analyserRef.current = analyser;
//       setIsVisualizerActive(true);
//     } catch (err) {
//       console.warn("Visualizer failed (CORS or unsupported)", err);
//       setIsVisualizerActive(false);
//     }
//   };

//   setupVisualizer();

//   return () => {
//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }
//     if (audioContextRef.current) {
//       audioContextRef.current.close();
//     }
//   };
// }, [currentStation, isPlaying]);
//   // Load theme from localStorage or prefer-color-scheme
//   useEffect(() => {
//     const saved = localStorage.getItem("radio-theme");
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//     const dark = saved ? saved === "dark" : prefersDark;
//     setIsDarkMode(dark);
//     document.documentElement.style.backgroundColor = dark ? "#1a1a2e" : "#f8f9fa";
//   }, []);

//   // Save theme
//   const toggleTheme = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem("radio-theme", newMode ? "dark" : "light");
//     document.documentElement.style.backgroundColor = newMode ? "#1a1a2e" : "#f8f9fa";
//   };

//   // Auto-resume last station
//   useEffect(() => {
//     const saved = localStorage.getItem("radio-state");
//     if (saved) {
//       const { stationId, isPlaying: playing } = JSON.parse(saved);
//       const station = STATIONS.find(s => s.id === stationId);
//       if (station) {
//         setCurrentStation(station);
//         if (playing) {
//           setTimeout(() => {
//             audioRef.current.src = station.url;
//             audioRef.current.volume = volume;
//             const playPromise = audioRef.current.play();
//             if (playPromise !== undefined) {
//               setIsLoading(true);
//               playPromise
//                 .then(() => {
//                   setIsPlaying(true);
//                   setIsLoading(false);
//                 })
//                 .catch((err) => {
//                   if (err.name !== "AbortError") {
//                     console.error("Playback failed:", err);
//                   }
//                   setIsLoading(false);
//                 });
//             }
//           }, 100);
//         }
//       }
//     }
//   }, [volume]);

//   // Save state
//   useEffect(() => {
//     if (currentStation && isPlaying) {
//       localStorage.setItem("radio-state", JSON.stringify({
//         stationId: currentStation.id,
//         isPlaying: true
//       }));
//     }
//   }, [currentStation, isPlaying]);

//   // Fetch FIP metadata
//   useEffect(() => {
//     if (currentStation?.id === "fip") {
//       const fetchMeta = () => {
//         fetch("https://www.fip.fr/latest/api/graphql?operationName=GetLive&variables=%7B%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22a44c0356e7865e490870718e6e5be3e89a25355765301798963d934941488285%22%7D%7D")
//           .then(r => r.json())
//           .then(data => {
//             const item = data?.data?.live;
//             if (item) {
//               setArtist(item.artist);
//               setTitle(item.title);
//             }
//           })
//           .catch(() => {});
//       };

//       fetchMeta();
//       const interval = setInterval(fetchMeta, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [currentStation]);

//   const toggleStation = (station) => {
//     const cleanUrl = station.url.trim();

//     if (currentStation?.url.trim() === cleanUrl) {
//       if (isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         const playPromise = audioRef.current.play();
//         if (playPromise !== undefined) {
//           setIsLoading(true);
//           playPromise
//             .then(() => {
//               setIsPlaying(true);
//               setIsLoading(false);
//             })
//             .catch((err) => {
//               if (err.name !== "AbortError") {
//                 console.error("Play error:", err);
//               }
//               setIsLoading(false);
//             });
//         }
//       }
//     } else {
//       if (isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       }

//       setIsLoading(true);
//       setCurrentStation(station);
//       audioRef.current.src = cleanUrl;
//       audioRef.current.volume = volume;
//       audioRef.current.load();

//       const playPromise = audioRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             setIsPlaying(true);
//             setIsLoading(false);
//           })
//           .catch((err) => {
//             if (err.name !== "AbortError") {
//               console.error("Playback failed:", err);
//             }
//             setIsLoading(false);
//           });
//       }
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//   };

//   return (
//     <div style={styles.container(isDarkMode)}>
//       {/* Theme Toggle */}
//       <button onClick={toggleTheme} style={styles.themeToggle(isDarkMode)}>
//         {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
//       </button>

//       {/* Logo */}
//       <div style={styles.header}>
//         <Radio style={styles.logo} />
//         <h1 style={styles.title}>Global Radio</h1>
//         <p style={styles.subtitle}>Live from around the world 🌍</p>
//       </div>

//       {/* Now Playing */}
//       {currentStation && (
//         <div style={styles.nowPlaying(isDarkMode)}>
//           <p style={styles.nowPlayingName}>{currentStation.name}</p>
//           <p style={styles.nowPlayingMeta}>{artist} • {title}</p>
//           <p style={styles.status(isPlaying, isDarkMode)}>
//             {isLoading ? (
//               <span style={styles.spinner}>🌀</span>
//             ) : isPlaying ? "▶️ Streaming" : "⏸ Paused"}
//           </p>
//         </div>
//       )}
// {/* Visualizer */}
// {isVisualizerActive && (
//   <div style={styles.visualizerContainer}>
//     <canvas ref={canvasRef} style={styles.visualizer} />
//     <p style={styles.visualizerLabel}>Sound Wave</p>
//   </div>
// )}
//       {/* Volume */}
//       <div style={styles.volume}>
//         <label style={styles.label(isDarkMode)}>Volume</label>
//         <div style={styles.volumeRow}>
//           <VolumeX size={16} style={styles.volIcon} onClick={() => setVolume(0)} />
//           <Volume1 size={16} style={styles.volIcon} onClick={() => setVolume(0.5)} />
//           <Volume2 size={16} style={styles.volIcon} onClick={() => setVolume(1)} />
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.01"
//             value={volume}
//             onChange={handleVolumeChange}
//             style={styles.slider(volume)}
//           />
//         </div>
//       </div>

//       {/* Stations */}
//       <div style={styles.stations}>
//         {STATIONS.map((station) => {
//           const isCurrent = currentStation?.id === station.id;
//           const isPlayingNow = isCurrent && isPlaying;

//           return (
//             <div key={station.id} style={styles.station(isCurrent, isDarkMode)}>
//               <div style={styles.stationInfo}>
//                 <span style={styles.flag}>{COUNTRY_FLAGS[station.country]}</span>
//                 <span style={styles.stationName}>{station.name}</span>
//               </div>
//               <button
//                 onClick={() => toggleStation(station)}
//                 style={styles.playButton(isPlayingNow, isDarkMode)}
//                 disabled={isLoading}
//               >
//                 {isLoading && isPlayingNow ? (
//                   <span style={styles.spinner}>🌀</span>
//                 ) : isPlayingNow ? (
//                   <Pause size={14} />
//                 ) : (
//                   <Play size={14} />
//                 )}{" "}
//                 {isLoading ? "Loading..." : isPlayingNow ? "Pause" : "Play"}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       <p style={styles.footer(isDarkMode)}>
//         One Radio Check • Auto-resumes last station
//       </p>

//       <audio ref={audioRef} preload="auto" />
//     </div>
//   );
// }

// const styles = {
//   container: (isDarkMode) => ({
//     minHeight: "100vh",
//     background: isDarkMode
//       ? "linear-gradient(135deg, #1a1a2e, #16213e)"
//       : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
//     color: isDarkMode ? "#fff" : "#212529",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//     margin: 0,
//     boxSizing: "border-box",
//     textAlign: "center",
//     transition: "background 0.4s ease",
//   }),

//   themeToggle: (isDarkMode) => ({
//     position: "absolute",
//     top: "20px",
//     right: "20px",
//     background: isDarkMode ? "#1a1a2e" : "#f8f9fa",
//     border: "2px solid #fbbf24",
//     color: "#fbbf24",
//     width: "40px",
//     height: "40px",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//     transition: "all 0.3s ease",
//   }),

//   header: {
//     marginBottom: "30px",
//   },

//   logo: {
//     width: "80px",
//     height: "80px",
//     color: "#fbbf24",
//     animation: "pulse 2s infinite",
//   },

//   title: {
//     fontSize: "2.5rem",
//     margin: "10px 0 5px",
//     background: "linear-gradient(90deg, #fbbf24, #3b82f6)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//   },

//   subtitle: {
//     fontSize: "1.1rem",
//     color: "#a0aec0",
//   },

//   nowPlaying: (isDarkMode) => ({
//     background: isDarkMode
//       ? "rgba(255, 255, 255, 0.1)"
//       : "rgba(0, 0, 0, 0.08)",
//     backdropFilter: "blur(10px)",
//     padding: "20px",
//     borderRadius: "16px",
//     maxWidth: "400px",
//     width: "100%",
//     marginBottom: "25px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//   }),

//   nowPlayingName: {
//     fontSize: "1.3rem",
//     fontWeight: "bold",
//     color: "#fbbf24",
//     margin: 0,
//   },

//   nowPlayingMeta: {
//     fontSize: "0.95rem",
//     color: "#e2e8f0",
//     margin: "8px 0 0",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//   },

//   status: (isPlaying, isDarkMode) => ({
//     fontSize: "0.85rem",
//     marginTop: "8px",
//     color: isPlaying ? "#10b981" : isDarkMode ? "#ef4444" : "#dc3545",
//   }),

//   volume: {
//     width: "100%",
//     maxWidth: "400px",
//     marginBottom: "30px",
//   },

//   label: (isDarkMode) => ({
//     display: "block",
//     fontSize: "0.9rem",
//     color: isDarkMode ? "#e2e8f0" : "#495057",
//     marginBottom: "8px",
//   }),

//   volumeRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },

//   volIcon: {
//     cursor: "pointer",
//     color: "#a0aec0",
//   },

//   slider: (volume) => ({
//     flex: 1,
//     height: "6px",
//     borderRadius: "3px",
//     background: `linear-gradient(to right, #fbbf24 ${volume * 100}%, #555 ${volume * 100}%)`,
//     WebkitAppearance: "none",
//     border: "none",
//     cursor: "pointer",
//   }),

//   stations: {
//     width: "100%",
//     maxWidth: "600px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },

//   station: (isCurrent, isDarkMode) => ({
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "16px",
//     borderRadius: "12px",
//     background: isCurrent
//       ? "linear-gradient(90deg, #f59e0b, #f97316)"
//       : isDarkMode
//         ? "rgba(255, 255, 255, 0.08)"
//         : "rgba(0, 0, 0, 0.06)",
//     backdropFilter: isCurrent ? "blur(10px)" : "none",
//     border: isCurrent ? "2px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
//     transition: "all 0.3s ease",
//     boxShadow: isCurrent ? "0 8px 20px rgba(251, 191, 36, 0.2)" : "0 2px 8px rgba(0,0,0,0.2)",
//     transform: isCurrent ? "scale(1.02)" : "scale(1)",
//   }),

//   stationInfo: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     flex: 1,
//     textAlign: "left",
//   },

//   flag: {
//     fontSize: "1.5rem",
//   },

//   stationName: {
//     fontSize: "1rem",
//     fontWeight: "500",
//   },

//   playButton: (isPlaying, isDarkMode) => ({
//     backgroundColor: isPlaying ? "#ef4444" : isDarkMode ? "#10b981" : "#0d6efd",
//     color: "#fff",
//     border: "none",
//     padding: "10px 16px",
//     borderRadius: "8px",
//     fontSize: "0.9rem",
//     fontWeight: "600",
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//     cursor: "pointer",
//     transition: "background 0.2s",
//   }),

//   footer: (isDarkMode) => ({
//     fontSize: "0.8rem",
//     color: isDarkMode ? "#718096" : "#6c757d",
//     marginTop: "30px",
//     textAlign: "center",
//   }),

//   spinner: {
//     animation: "spin 1s linear infinite",
//     display: "inline-block",
//   },

//   visualizerContainer: {
//   marginTop: "20px",
//   textAlign: "center",
// },

// visualizer: {
//   borderRadius: "12px",
//   border: "1px solid rgba(251, 191, 36, 0.3)",
//   background: "rgba(0,0,0,0.2)",
// },

// visualizerLabel: {
//   fontSize: "0.85rem",
//   color: "#a0aec0",
//   marginTop: "6px",
// }
// };

// // Add animation to head
// const style = document.createElement('style');
// style.textContent = `
// @keyframes pulse {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.8; }
// }
// @keyframes spin {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
// `;
// document.head.appendChild(style);

// export default App;
// src/App.jsx

import { useRef, useState, useEffect } from "react";
import "./App.css";
import AboutPage from "./AboutPage";

const STATIONS = [
  {
    id: "fip",
    name: "FIP Radio (France)",
    url: "https://icecast.radiofrance.fr/fip-midfi.mp3",
    country: "FR",
    gradient: "linear-gradient(135deg, #fbbf24, #ec4899)",
  },
  {
    id: "kexp",
    name: "KEXP Seattle (USA)",
    url: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3",
    country: "US",
    gradient: "linear-gradient(135deg, #3b82f6, #10b981)",
  },
  {
    id: "swiss",
    name: "Radio Swiss Jazz (Switzerland)",
    url: "https://stream.srg-ssr.ch/m/rsj/mp3_128",
    country: "CH",
    gradient: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
  },
  {
    id: "paradise",
    name: "Radio Paradise (USA)",
    url: "https://stream.radioparadise.com/mp3-128",
    country: "US",
    gradient: "linear-gradient(135deg, #84cc16, #f97316)",
  },
  {
    id: "dlf",
    name: "Deutschlandfunk (Germany)",
    url: "https://st01.dlf.de/dlf/01/128/mp3/stream.mp3",
    country: "DE",
    gradient: "linear-gradient(135deg, #ef4444, #1f2937)",
  },
  {
    id: "triplej",
    name: "Triple J (Australia)",
    url: "https://live-radio01.mediahubaustralia.com/2TJW/mp3/",
    country: "AU",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
  {
    id: "npr",
    name: "NPR (USA)",
    url: "https://npr-ice.streamguys1.com/live.mp3",
    country: "US",
    gradient: "linear-gradient(135deg, #2563eb, #16a34a)",
  },

  {
    id: "rai",
    name: "RAI Radio 1 (Italy)",
    url: "https://icestreaming.rai.it/1.mp3",
    country: "IT",
    gradient: "linear-gradient(135deg, #22c55e, #0ea5e9)",
  },
  {
    id: "abcjazz",
    name: "ABC Jazz (Australia)",
    url: "https://live-radio01.mediahubaustralia.com/JAZW/mp3/",
    country: "AU",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  },
  { 
    id: "bbcethiopia", 
    name: "BBC Amharic (Ethiopia)", 
    url: "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service", // direct URL
    country: "ET", 
    gradient: "linear-gradient(135deg, #0ea5e9, #22c55e)" 
  },
  
];

const COUNTRY_FLAGS = {
  FR: "🇫🇷", // France
  US: "🇺🇸", // USA
  CH: "🇨🇭", // Switzerland
  DE: "🇩🇪", // Germany
  AU: "🇦🇺", // Australia
  IT: "🇮🇹", // Italy
  ET: "🇪🇹", // Ethiopia
};


function App() {
  const audioRef = useRef(null);
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [artist, setArtist] = useState("Unknown Artist");
  const [title, setTitle] = useState("Live Radio");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [dynamicBg, setDynamicBg] = useState(true);

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDarkMode(theme);

    const savedBg = localStorage.getItem("dynamicBg");
    const bgEnabled = savedBg ? savedBg === "true" : true;
    setDynamicBg(bgEnabled);
  }, []);

  // Save theme
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.className = newMode ? "dark" : "light"; // Sync body class
  };

  // Toggle dynamic background
  const toggleDynamicBg = () => {
    const newValue = !dynamicBg;
    setDynamicBg(newValue);
    localStorage.setItem("dynamicBg", newValue);
  };

  // Auto-resume last station
  useEffect(() => {
    const saved = localStorage.getItem("radio-state");
    if (saved) {
      const { stationId, isPlaying: playing } = JSON.parse(saved);
      const station = STATIONS.find((s) => s.id === stationId);
      if (station) {
        setCurrentStation(station);
        if (playing) setIsPlaying(true);
      }
    }
  }, []);

  // Save current station and play state
  useEffect(() => {
    if (currentStation) {
      localStorage.setItem(
        "radio-state",
        JSON.stringify({
          stationId: currentStation.id,
          isPlaying,
        })
      );
    }
  }, [currentStation, isPlaying]);

  // Fetch metadata for FIP
  useEffect(() => {
    if (currentStation?.id === "fip") {
      const fetchMeta = () => {
        fetch(
          "https://www.fip.fr/latest/api/graphql?operationName=GetLive&variables=%7B%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%22a44c0356e7865e490870718e6e5be3e89a25355765301798963d934941488285%22%7D%7D"
        )
          .then((r) => r.json())
          .then((data) => {
            const item = data?.data?.live;
            if (item) {
              setArtist(item.artist);
              setTitle(item.title);
            }
          })
          .catch(() => console.warn("Failed to fetch FIP metadata"));
      };

      fetchMeta();
      const interval = setInterval(fetchMeta, 30000);
      return () => clearInterval(interval);
    } else {
      setArtist("Unknown Artist");
      setTitle("Live Radio");
    }
  }, [currentStation]);

  // Toggle station play/pause
  const toggleStation = (station) => {
    const cleanUrl = station.url.trim();

    if (currentStation?.url.trim() === cleanUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((err) => {
              if (err.name === "NotAllowedError") {
                alert("Please interact with the page to enable audio.");
              } else {
                console.error("Playback error:", err);
              }
            });
        }
      }
    } else {
      if (isPlaying) {
        audioRef.current.pause();
      }

      setCurrentStation(station);
      audioRef.current.src = cleanUrl;
      audioRef.current.volume = volume;
      audioRef.current.load();

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            if (err.name === "NotAllowedError") {
              console.warn("Playback failed: User interaction required");
            } else {
              console.error("Playback failed:", err);
            }
          });
      }
    }
  };

  // Handle volume slider
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  const muteVolume = () => {
    setVolume(0);
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }
  };
  // Adjust volume by delta
  const adjustVolume = (delta) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // CSS-in-JS for Static UI (when dynamic background is off)
  const staticUIStyles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: "500px",
      margin: "40px auto",
      padding: "0 16px",
      flex: 1,
    },
    card: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      width: "100%",
      color: "#ffffff",
      maxWidth: "400px",
    },
    title: {
      fontSize: "1.5rem",
      margin: "0 0 10px",
      fontWeight: "600",
      color: "#fbbf24",
    },
    text: {
      fontSize: "1rem",
      color: "#e2e8f0",
      margin: "8px 0",
      lineHeight: "1.6",
    },
  };

  return (
    <div
      className={`App ${isDarkMode ? "dark" : "light"} ${
        dynamicBg ? "dynamic-bg" : "static-bg"
      }`}
      style={{
        background:
          dynamicBg && currentStation?.gradient
            ? currentStation.gradient
            : "none",
      }}
    >
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1>Abd Global Radio</h1>
          <p>Live from around the world 🌍</p>
        </div>
      </header>

      {/* Static UI (CSS-in-JS) when Dynamic Background is OFF */}
      {!dynamicBg && (
        <div style={staticUIStyles.container}>
          <div style={staticUIStyles.card}>
            <h3 style={staticUIStyles.title}>Welcome to Radio</h3>
            <p style={staticUIStyles.text}>
              Background animations are disabled.
            </p>
            <p style={staticUIStyles.text}>
              Play a station to start listening.
            </p>
          </div>
        </div>
      )}

      {/* Now Playing (only if dynamic background is ON) */}
      {dynamicBg && currentStation && (
        <div className="now-playing">
          <h2>{currentStation.name}</h2>
          <p className="meta">
            {artist} • {title}
          </p>
          <p className={isPlaying ? "status playing" : "status paused"}>
            {isPlaying ? "▶️ Streaming" : "⏸ Paused"}
          </p>
        </div>
      )}

      {/* Sound Wave Visualizer */}
      {dynamicBg && isPlaying && (
        <div className="visualizer-container">
          <div className="waveform">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
          <p className="visualizer-label">Sound Wave</p>
        </div>
      )}

      {/* Volume Controls */}
      <div className="volume-control">
        <label>Volume</label>
        <div className="volume-row">
          <span
            onClick={muteVolume}
            className="vol-icon"
            role="button"
            aria-label="Mute Volume"
          >
            🔇
          </span>
          <span
            onClick={() => adjustVolume(-0.1)}
            className="vol-icon"
            role="button"
            aria-label="Decrease Volume"
          >
            🔉
          </span>
          <span
            onClick={() => adjustVolume(0.1)}
            className="vol-icon"
            role="button"
            aria-label="Increase Volume"
          >
            🔊
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="slider"
            aria-label="Volume Slider"
          />
        </div>
      </div>

      {/* Stations List */}
      <div className="stations">
        {STATIONS.map((station) => {
          const isCurrent = currentStation?.id === station.id;
          const isPlayingNow = isCurrent && isPlaying;

          return (
            <div
              key={station.id}
              className={`station ${isCurrent ? "active" : ""}`}
            >
              <div className="station-info">
                <span className="flag">{COUNTRY_FLAGS[station.country]}</span>
                <span>{station.name}</span>
              </div>
              <button
                onClick={() => toggleStation(station)}
                className={`play-btn ${isPlayingNow ? "pause" : "play"}`}
                aria-label={isPlayingNow ? "Pause" : "Play"}
              >
                {isPlayingNow ? "⏸ Pause" : "▶ Play"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <span
            className="footer-link"
            onClick={() => setShowAbout(true)}
            role="button"
            aria-label="About this app"
          >
            ℹ️ About
          </span>
          <span className="footer-separator">•</span>
          <span
            className="footer-link"
            onClick={toggleTheme}
            role="button"
            aria-label={
              isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </span>
          <span className="footer-separator">•</span>
          <span
            className="footer-link"
            onClick={toggleDynamicBg}
            role="button"
            aria-label={
              dynamicBg
                ? "Disable Dynamic Background"
                : "Enable Dynamic Background"
            }
          >
            {dynamicBg ? "🎨 Dynamic On" : "🎨 Dynamic Off"}
          </span>
        </div>
        <div className="footer-text">
          <strong>Spartaw</strong> One Radio • Works Offline
        </div>
      </footer>

      {/* About Modal */}
      {showAbout && <AboutPage onClose={() => setShowAbout(false)} />}

      {/* Audio Element */}
      <audio ref={audioRef} preload="auto" />
    </div>
  );
}

export default App;
