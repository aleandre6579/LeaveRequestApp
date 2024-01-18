package guess

import (
	"fmt"
	"time"

	"gorm.io/gorm"
)

func GetLeave(db *gorm.DB, leaveId int) (*Leave, error) {
	leave := &Leave{}
	err := db.Where("leaveId = ?", leaveId).First(leave).Error
	return leave, err
}

func CreateLeave(db *gorm.DB, employeeId int, reason string, startDate time.Time, endDate time.Time) error {
	leave := &Leave{
		EmployeeID: employeeId,
		Reason:     reason,
		StartDate:  startDate,
		EndDate:    endDate,
	}
	if err := db.Create(leave).Error; err != nil {
		fmt.Println("Failed to create new leave")
		return err
	}

	return nil
}
