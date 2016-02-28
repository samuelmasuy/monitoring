package monitoring

import (
	"encoding/json"
	"log"
	"math/rand"
	"strconv"

	"github.com/pivotal-golang/bytefmt"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/net"
)

type Monitors struct {
	Monitors []*Monitor `json:"monitors"`
}

type Monitor struct {
	To   string `json:"to"`
	Data string `json:"data"`
}

func GetMonitoring() ([]byte, error) {
	// r, err := cpu.CPUPercent(time.Duration(1), true)
	// r, err := cpu.CPUInfo()
	// if err != nil {
	// 	log.Println("err", err)
	// }
	// log.Println("response", r)
	cpuPercent := rand.Intn(100)
	cpuValue := strconv.Itoa(cpuPercent)
	cpuValue = cpuValue + "%"
	cpuMonitor := &Monitor{To: "cpu", Data: cpuValue}
	log.Println(cpuMonitor)

	diskUsage, err := disk.DiskUsage("/")
	if err != nil {
		log.Println("err", err)
		return nil, err
	}
	diskValue := bytefmt.ByteSize(diskUsage.Used)
	diskMonitor := &Monitor{To: "disk", Data: diskValue}
	log.Println(diskMonitor)

	ramPercent, err := mem.VirtualMemory()
	if err != nil {
		log.Println("err", err)
		return nil, err
	}
	ramValue := strconv.FormatFloat(ramPercent.UsedPercent, 'f', 2, 64)
	ramValue = ramValue + "%"
	ramMonitor := &Monitor{To: "ram", Data: ramValue}
	log.Println(ramMonitor)

	netUsages, err := net.NetIOCounters(false)
	if err != nil {
		log.Println("err", err)
		return nil, err
	}
	netUsage := netUsages[0]
	netValue := bytefmt.ByteSize(netUsage.BytesRecv)
	netMonitor := &Monitor{To: "net", Data: netValue}
	log.Println(netMonitor)

	s := &Monitors{[]*Monitor{cpuMonitor, diskMonitor, ramMonitor, netMonitor}}
	b, err := json.Marshal(s)
	if err != nil {
		return nil, err
	}
	return b, nil
}
