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

func GetLeaves(db *gorm.DB) ([]Leave, error) {
	var leaves []Leave
	err := db.Find(&leaves).Error
	return leaves, err
}

func CreateLeave(db *gorm.DB, employeeId int, reason string, startDate string, duration int) (*Leave, error) {
	leave := &Leave{
		EmployeeID: employeeId,
		Reason:     reason,
		StartDate:  startDate,
		Duration:   duration,
	}

	res := db.Create(leave)
	if res.Error != nil {
		fmt.Println("Failed to create new leave")
		return &Leave{}, res.Error
	}

	return leave, nil
}

func DeleteLeave(db *gorm.DB, leaveId uint) error {
	res := db.Delete(&Leave{ID: leaveId})
	if res.Error != nil {
		fmt.Println("Failed to delete leave")
		return res.Error
	}

	return nil
}
