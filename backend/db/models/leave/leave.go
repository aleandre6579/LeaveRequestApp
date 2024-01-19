package leave

import (
	"gorm.io/gorm"
)

type Leave struct {
	gorm.Model
	ID         uint
	EmployeeID int
	Reason     string
	StartDate  string
	Duration   int
}
