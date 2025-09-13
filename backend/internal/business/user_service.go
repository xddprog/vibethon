package business

import (
	"backend/internal/models"
	"backend/internal/repository"
	"errors"
)

type UserService interface {
	CreateUser(req *models.CreateUserRequest) (*models.UserResponse, error)
	GetUserByID(id uint64) (*models.UserResponse, error)
	//UpdateUser(id uint, req *models.UpdateUserRequest) (*models.UserResponse, error)
	//DeleteUser(id uint) error
	ListUsers(page, pageSize int) ([]*models.UserResponse, int64, error)
	GetCoworkingStatus(id uint) (*models.Coworking, error)
	UpdateCoworkingStatus(id uint, status models.CoworkingStatus) (*models.Coworking, error)
}

type userService struct {
	userRepo repository.UserRepository
}

func NewUserService(userRepo repository.UserRepository) UserService {
	return &userService{
		userRepo: userRepo,
	}
}

func (s *userService) CreateUser(req *models.CreateUserRequest) (*models.UserResponse, error) {
	// Проверяем, существует ли пользователь с таким ID (Telegram ID)
	existingUser, _ := s.userRepo.GetByID(req.ID)
	if existingUser != nil {
		return nil, errors.New("user with this ID already exists")
	}

	// Проверяем, существует ли пользователь с таким username

	user := &models.User{
		ID:        req.ID, // Telegram ID
		Username:  req.Username,
		IsActive:  false,           // По умолчанию неактивен
		Role:      models.RoleUser, // По умолчанию обычный пользователь
		Lvl:       0,
		Xp:        0,
		Visits:    0,
		Donations: 0,
	}

	if err := s.userRepo.Create(user); err != nil {
		return nil, err
	}

	return s.mapUserToResponse(user), nil
}

func (s *userService) GetUserByID(id uint64) (*models.UserResponse, error) {
	user, err := s.userRepo.GetByID(id)
	if err != nil {
		return nil, err
	}

	return s.mapUserToResponse(user), nil
}

//func (s *userService) UpdateUser(id uint, req *models.UpdateUserRequest) (*models.UserResponse, error) {
//	user, err := s.userRepo.GetByID(id)
//	if err != nil {
//		return nil, err
//	}
//
//	// Обновляем только те поля, которые были переданы
//	if req.Username != nil {
//		// Проверяем уникальность username
//		existingUser, _ := s.userRepo.GetByUsername(*req.Username)
//		if existingUser != nil && existingUser.ID != user.ID {
//			return nil, errors.New("user with this username already exists")
//		}
//		user.Username = *req.Username
//	}
//
//	if req.Email != nil {
//		// Проверяем уникальность email
//		existingUser, _ := s.userRepo.GetByEmail(*req.Email)
//		if existingUser != nil && existingUser.ID != user.ID {
//			return nil, errors.New("user with this email already exists")
//		}
//		user.Email = *req.Email
//	}
//
//	if req.IsActive != nil {
//		user.IsActive = *req.IsActive
//	}
//
//	if err := s.userRepo.Update(user); err != nil {
//		return nil, err
//	}
//
//	return s.mapUserToResponse(user), nil
//}

func (s *userService) ListUsers(page, pageSize int) ([]*models.UserResponse, int64, error) {
	if page < 1 {
		page = 1
	}
	if pageSize < 1 || pageSize > 100 {
		pageSize = 10
	}

	offset := (page - 1) * pageSize

	users, total, err := s.userRepo.List(offset, pageSize)
	if err != nil {
		return nil, 0, err
	}

	responses := make([]*models.UserResponse, len(users))
	for i, user := range users {
		responses[i] = s.mapUserToResponse(user)
	}

	return responses, total, nil
}

func (s *userService) mapUserToResponse(user *models.User) *models.UserResponse {
	return &models.UserResponse{
		Username:     user.Username,
		IsActive:     user.IsActive,
		Role:         user.Role,
		Achievements: user.Achievements,
		Visits:       user.Visits,
		Xp:           user.Xp,
		Lvl:          user.Lvl,
	}
}

func (s *userService) GetCoworkingStatus(id uint) (*models.Coworking, error) {
	coworking, err := s.userRepo.GetCoworking(1)
	if err != nil {
		return nil, err
	}
	return coworking, nil
}

func (s *userService) UpdateCoworkingStatus(id uint, status models.CoworkingStatus) (*models.Coworking, error) {
	coworking, err := s.userRepo.GetCoworking(id)
	if err != nil {
		return nil, err
	}

	if coworking.Status != status {
		coworking.Status = status
		return nil, s.userRepo.UpdateCoworking(coworking)
	}

	return coworking, nil
}
