package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"github.com/samuelmasuy/websocket/server/monitoring"
)

const (
	// Time allowed to write the file to the client.
	writeWait = 2 * time.Second

	// Time allowed to read the next pong message from the client.
	pongWait = 60 * time.Second

	// Send pings to client with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Poll monitoring for changes with this period.
	monitorPeriod = 2 * time.Second
)

var (
	addr     = ":3000"
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

func reader(ws *websocket.Conn) {
	defer ws.Close()
	ws.SetReadLimit(512)
	ws.SetReadDeadline(time.Now().Add(pongWait))
	ws.SetPongHandler(func(string) error { ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, _, err := ws.ReadMessage()
		if err != nil {
			break
		}
	}
}

func writer(ws *websocket.Conn) {
	lastError := ""
	pingTicker := time.NewTicker(pingPeriod)
	monitorTicker := time.NewTicker(monitorPeriod)
	defer func() {
		pingTicker.Stop()
		monitorTicker.Stop()
		ws.Close()
	}()
	for {
		select {
		case <-monitorTicker.C:
			var m []byte
			var err error

			m, err = monitoring.GetMonitoring()
			if err != nil {
				m = []byte(s.Error())
			}

			if m != nil {
				ws.SetWriteDeadline(time.Now().Add(writeWait))
				if err := ws.WriteMessage(websocket.TextMessage, m); err != nil {
					return
				}
			}
		case <-pingTicker.C:
			ws.SetWriteDeadline(time.Now().Add(writeWait))
			if err := ws.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

func serveWs(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		if _, ok := err.(websocket.HandshakeError); !ok {
			log.Println(err)
		}
		return
	}

	go writer(ws)
	reader(ws)
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./client/dist/")))
	http.HandleFunc("/ws", serveWs)
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal(err)
	}
}
