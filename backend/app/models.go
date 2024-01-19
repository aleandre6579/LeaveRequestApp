package app

import ()

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LeavePostRequest struct {
	EmployeeID int    `json:"employeeID"`
	Reason     string `json:"reason"`
	StartDate  string `json:"startDate"`
	Duration   int    `json:"duration"`
}

type LeaveRequest struct {
	LeaveID    uint   `json:"leaveID"`
	EmployeeID int    `json:"employeeID"`
	Reason     string `json:"reason"`
	StartDate  string `json:"startDate"`
	Duration   int    `json:"duration"`
}
