package leave

import (
	"gorm.io/gorm"
)

type Leave struct {
	gorm.Model
	ID         uint
	EmployeeId int
	Reason     string
	StartDate  string
	Duration   int
}
