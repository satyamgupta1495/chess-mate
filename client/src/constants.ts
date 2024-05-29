export const URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === "localhost") ? "http://localhost:3000" : "https://chess-mate-production.up.railway.app";


console.log("URLLL", window.location.hostname, URL)