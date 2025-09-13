package models

import (
	"time"
)

type UserRole string

const (
	RoleUser  UserRole = "user"
	RoleAdmin UserRole = "admin"
	RoleMod   UserRole = "moderator"
)

type User struct {
	ID           uint64        `json:"id" gorm:"primarykey"` //telegrammid
	Username     string        `json:"username" gorm:"uniqueIndex;not null"`
	IsActive     bool          `json:"is_active" gorm:"default:false"`
	Role         UserRole      `json:"role" gorm:"default:'user'"`
	Achievements []Achievement `json:"achievements" gorm:"many2many:user_achievements;"`
	Lvl          int           `json:"lvl" gorm:"default:0"`
	Xp           int           `json:"xp" gorm:"default:0"`
	Visits       int           `json:"visits" gorm:"default:0"` // количество визитов
	Donations    int           `json:"donations" gorm:"default:0"`
	CreatedAt    time.Time     `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time     `json:"updated_at" gorm:"autoUpdateTime"`
}
type Achievement struct {
	ID          uint   `json:"id" gorm:"primarykey"`
	Name        string `json:"name" gorm:"not null"`
	Description string `json:"description"`
	Color       string `json:"color" gorm:"default:'#3498db'"` // HEX цвет
}

type CoworkingStatus string

const (
	StatusOpen   CoworkingStatus = "open"
	StatusClosed CoworkingStatus = "closed"
)

type Coworking struct {
	ID                   uint            `json:"id" gorm:"primarykey"`
	Name                 string          `json:"name" gorm:"not null"`
	Status               CoworkingStatus `json:"status" gorm:"default:'open'"`
	Capacity             *int            `json:"capacity"`
	CurrentPeople        int             `json:"current_people" gorm:"default:0"`
	MonitorsTotal        int             `json:"monitors_total" gorm:"default:0"`
	MonitorsFree         int             `json:"monitors_free" gorm:"default:0"`
	PlaystationAvailable bool            `json:"playstation_available" gorm:"default:true"`
	ResponsibleUserID    *uint64         `json:"responsible_user_id"`
	ResponsibleUser      *User           `json:"responsible_user,omitempty" gorm:"foreignKey:ResponsibleUserID"`
	SupportContact       string          `json:"support_contact"`
	UpdatedAt            time.Time       `json:"updated_at"`
}

type CreateUserRequest struct {
	ID       uint64 `json:"id"`       // Telegram ID (primary key)
	Username string `json:"username"` // уникальный логин
}

type UpdateUserRequest struct {
	Username *string   `json:"username,omitempty"`
	IsActive *bool     `json:"is_active,omitempty"`
	Role     *UserRole `json:"role,omitempty"`
}

type UpdateCoworkingRequest struct {
	Name                 *string          `json:"name,omitempty"`
	Status               *CoworkingStatus `json:"status,omitempty"`
	Capacity             *int             `json:"capacity,omitempty"`
	CurrentPeople        *int             `json:"current_people,omitempty"`
	MonitorsTotal        *int             `json:"monitors_total,omitempty"`
	MonitorsFree         *int             `json:"monitors_free,omitempty"`
	PlaystationAvailable *bool            `json:"playstation_available,omitempty"`
	ResponsibleUserID    *uint64          `json:"responsible_user_id,omitempty"`
	SupportContact       *string          `json:"support_contact,omitempty"`
}

type UserResponse struct {
	ID           uint64        `json:"id"`
	Username     string        `json:"username"`
	IsActive     bool          `json:"is_active"`
	Role         UserRole      `json:"role"`
	Achievements []Achievement `json:"achievements,omitempty"`
	Visits       int           `json:"visits"`
	Xp           int           `json:"xp"`
	Lvl          int           `json:"lvl"`
}
