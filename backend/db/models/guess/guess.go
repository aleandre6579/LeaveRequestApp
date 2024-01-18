package guess

import (
	"time"

	"gorm.io/gorm"
)

type Leave struct {
	gorm.Model

	EmployeeID int
	Reason     string
	StartDate  time.Time
	EndDate    time.Time
}
