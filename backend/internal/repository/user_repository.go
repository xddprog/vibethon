package repository

import (
	"backend/internal/models"
	"errors"
	"gorm.io/gorm"
)

type UserRepository interface {
	Create(user *models.User) error
	GetByID(id uint64) (*models.User, error)
	GetByUsername(username string) (*models.User, error)
	Update(user *models.User) error
	Delete(id uint64) error
	List(offset, limit int) ([]*models.User, int64, error)
	CreateTables() error
	DropTables() error
	GetCoworking(id uint) (*models.Coworking, error)
	UpdateCoworking(coworking *models.Coworking) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) Create(user *models.User) error {
	if err := r.db.Create(user).Error; err != nil {
		return err
	}
	return nil
}

func (r *userRepository) GetByID(id uint64) (*models.User, error) {
	var user models.User
	if err := r.db.First(&user, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) Update(user *models.User) error {
	return r.db.Save(user).Error
}

func (r *userRepository) Delete(id uint64) error {
	if err := r.db.Delete(&models.User{}, id).Error; err != nil {
		return err
	}
	if r.db.RowsAffected == 0 {
		return errors.New("user not found")
	}
	return nil
}

func (r *userRepository) List(offset, limit int) ([]*models.User, int64, error) {
	var users []*models.User
	var total int64

	// Получаем общее количество записей
	if err := r.db.Model(&models.User{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Получаем пользователей с пагинацией
	if err := r.db.Offset(offset).Limit(limit).Find(&users).Error; err != nil {
		return nil, 0, err
	}

	return users, total, nil
}

// CreateTables создает таблицы в базе данных
func (r *userRepository) CreateTables() error {
	return r.db.AutoMigrate(&models.User{})
}

// DropTables удаляет таблицы из базы данных
func (r *userRepository) DropTables() error {
	return r.db.Migrator().DropTable(&models.User{})
}

func (r *userRepository) GetCoworking(id uint) (*models.Coworking, error) {
	var coworking models.Coworking
	if err := r.db.Preload("ResponsibleUser").First(&coworking, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("coworking not found")
		}
		return nil, err
	}
	return &coworking, nil
}

func (r *userRepository) UpdateCoworking(coworking *models.Coworking) error {
	return r.db.Save(coworking).Error
}

func (r *userRepository) GetByUsername(username string) (*models.User, error) {
	var user models.User
	if err := r.db.Where("username = ?", username).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}
	return &user, nil
}
