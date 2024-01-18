package app

import (
	"time"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type LeaveRequest struct {
	EmployeeID int       `json:"number"`
	Reason     string    `json:"level"`
	StartDate  time.Time `json:"start_date"`
	EndDate    time.Time `json:"end_date"`
}

type Level struct {
	LevelName string
	Upper     int
	Lower     int
}
