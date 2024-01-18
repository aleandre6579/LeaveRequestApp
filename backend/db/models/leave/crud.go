package leave

import (
	"fmt"

	"gorm.io/gorm"
)

func GetLeave(db *gorm.DB, leaveId int64) (*Leave, error) {
	leave := &Leave{}
	err := db.Where("id = ?", leaveId).First(leave).Error
	return leave, err
}

func CreateLeave(db *gorm.DB, employeeId int, reason string, startDate string, duration int) error {
	leave := &Leave{
		EmployeeID: employeeId,
		Reason:     reason,
		StartDate:  startDate,
		Duration:   duration,
	}

	res := db.Create(leave)
	if res.Error != nil {
		fmt.Println("Failed to create new leave")
		return res.Error
	}

	return nil
}
