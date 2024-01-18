package leave

import (
	"gorm.io/gorm"
)

type Leave struct {
	gorm.Model

	EmployeeID int
	Reason     string
	StartDate  string
	Duration   int
}
