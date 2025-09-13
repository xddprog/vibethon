package api

import (
	"backend/internal/business"
	"backend/internal/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userService business.UserService
}

func NewUserHandler(userService business.UserService) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

// CreateUser создает нового пользователя
// @Summary Создать пользователя
// @Description Создает нового пользователя в системе
// @Tags users
// @Accept json
// @Produce json
// @Param user body models.CreateUserRequest true "Данные пользователя"
// @Success 201 {object} models.UserResponse
// @Failure 400 {object} ErrorResponse "Неверный формат запроса"
// @Failure 409 {object} ErrorResponse "Пользователь уже существует"
// @Failure 500 {object} ErrorResponse "Внутренняя ошибка сервера"
// @Router /users [post]
func (h *UserHandler) CreateUser(c *gin.Context) {
	var req models.CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: err.Error()})
		return
	}

	user, err := h.userService.CreateUser(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, user)
}

// GetUser получает пользователя по ID
// @Summary Получить пользователя
// @Description Получает пользователя по ID
// @Tags users
// @Produce json
// @Param id path int true "ID пользователя"
// @Success 200 {object} models.UserResponse
// @Failure 400 {object} ErrorResponse "Неверный ID пользователя"
// @Failure 404 {object} ErrorResponse "Пользователь не найден"
// @Failure 500 {object} ErrorResponse "Внутренняя ошибка сервера"
// @Router /users/{id} [get]
func (h *UserHandler) GetUser(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "invalid user ID"})
		return
	}

	user, err := h.userService.GetUserByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

// UpdateUser обновляет пользователя
// @Summary Обновить пользователя
// @Description Обновляет данные пользователя
// @Tags users
// @Accept json
// @Produce json
// @Param id path int true "ID пользователя"
// @Param user body models.UpdateUserRequest true "Обновленные данные"
// @Success 200 {object} models.UserResponse
// @Failure 400 {object} ErrorResponse "Неверный формат запроса или ID"
// @Failure 404 {object} ErrorResponse "Пользователь не найден"
// @Failure 500 {object} ErrorResponse "Внутренняя ошибка сервера"
// @Router /users/{id} [put]
//func (h *UserHandler) UpdateUser(c *gin.Context) {
//	idParam := c.Param("id")
//	id, err := strconv.ParseUint(idParam, 10, 64)
//	if err != nil {
//		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "invalid user ID"})
//		return
//	}
//
//	var req models.UpdateUserRequest
//	if err := c.ShouldBindJSON(&req); err != nil {
//		c.JSON(http.StatusBadRequest, ErrorResponse{Error: err.Error()})
//		return
//	}
//
//	user, err := h.userService.UpdateUser(id, &req)
//	if err != nil {
//		if errors.Is(err, business.ErrUserNotFound) {
//			c.JSON(http.StatusNotFound, ErrorResponse{Error: err.Error()})
//			return
//		}
//		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: err.Error()})
//		return
//	}
//
//	c.JSON(http.StatusOK, user)
//}

// DeleteUser удаляет пользователя
// @Summary Удалить пользователя
// @Description Удаляет пользователя по ID
// @Tags users
// @Param id path int true "ID пользователя"
// @Success 204 "Пользователь успешно удален"
// @Failure 400 {object} ErrorResponse "Неверный ID пользователя"
// @Failure 404 {object} ErrorResponse "Пользователь не найден"
// @Failure 500 {object} ErrorResponse "Внутренняя ошибка сервера"
// @Router /users/{id} [delete]
//func (h *UserHandler) DeleteUser(c *gin.Context) {
//	idParam := c.Param("id")
//	id, err := strconv.ParseUint(idParam, 10, 64)
//	if err != nil {
//		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "invalid user ID"})
//		return
//	}
//
//	err = h.userService.DeleteUser(id)
//	if err != nil {
//		if errors.Is(err, business.ErrUserNotFound) {
//			c.JSON(http.StatusNotFound, ErrorResponse{Error: err.Error()})
//			return
//		}
//		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: err.Error()})
//		return
//	}
//
//	c.Status(http.StatusNoContent)
//}

// ListUsers получает список пользователей
// @Summary Список пользователей
// @Description Получает список пользователей с пагинацией
// @Tags users
// @Produce json
// @Param page query int false "Номер страницы" default(1)
// @Param page_size query int false "Размер страницы" default(10)
// @Success 200 {object} UserListResponse
// @Failure 400 {object} ErrorResponse "Неверные параметры пагинации"
// @Failure 500 {object} ErrorResponse "Внутренняя ошибка сервера"
// @Router /users [get]
func (h *UserHandler) ListUsers(c *gin.Context) {
	page := 1
	pageSize := 10

	if pageParam := c.Query("page"); pageParam != "" {
		if p, err := strconv.Atoi(pageParam); err == nil && p > 0 {
			page = p
		} else {
			c.JSON(http.StatusBadRequest, ErrorResponse{Error: "invalid page parameter"})
			return
		}
	}

	if sizeParam := c.Query("page_size"); sizeParam != "" {
		if s, err := strconv.Atoi(sizeParam); err == nil && s > 0 && s <= 100 {
			pageSize = s
		} else {
			c.JSON(http.StatusBadRequest, ErrorResponse{Error: "invalid page_size parameter"})
			return
		}
	}

	users, total, err := h.userService.ListUsers(page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: err.Error()})
		return
	}

	response := UserListResponse{
		Users: users,
		Pagination: PaginationInfo{
			Page:       page,
			PageSize:   pageSize,
			Total:      total,
			TotalPages: (total + int64(pageSize) - 1) / int64(pageSize),
		},
	}

	c.JSON(http.StatusOK, response)
}

// GetCoworking получает коворкинг по ID
// @Summary Получить коворкинг
// @Description Получает коворкинг по ID
// @Tags coworking
// @Produce json
// @Param id path int true "ID коворкинга"
// @Success 200 {object} models.Coworking
// @Failure 400 {object} ErrorResponse "Неверный ID коворкинга"
// @Failure 404 {object} ErrorResponse "Коворкинг не найден"
// @Failure 500 {object} ErrorResponse "Внутренняя ошибка сервера"
// @Router /coworking/{id} [get]
func (h *UserHandler) GetCoworking(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "invalid coworking ID"})
		return
	}

	coworking, err := h.userService.GetCoworkingStatus(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, coworking)
}

// UpdateCoworking обновляет коворкинг
// @Summary Обновить коворкинг
// @Description Обновляет данные коворкинга
// @Tags coworking
// @Accept json
// @Produce json
// @Param id path int true "ID коворкинга"
// @Param coworking body models.UpdateCoworkingRequest true "Обновленные данные"
// @Success 200 {object} models.Coworking
// @Failure 400 {object} ErrorResponse "Неверный формат запроса или ID"
// @Failure 404 {object} ErrorResponse "Коворкинг не найден"
// @Failure 500 {object} ErrorResponse "Внутренняя ошибка сервера"
// @Router /coworking/{id} [put]
func (h *UserHandler) UpdateCoworking(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "invalid coworking ID"})
		return
	}

	var req models.CoworkingStatus
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: err.Error()})
		return
	}

	coworking, err := h.userService.UpdateCoworkingStatus(uint(id), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, coworking)
}

type ErrorResponse struct {
	Error string `json:"error"`
}

type UserListResponse struct {
	Users      []*models.UserResponse `json:"users"`
	Pagination PaginationInfo         `json:"pagination"`
}

type PaginationInfo struct {
	Page       int   `json:"page"`
	PageSize   int   `json:"page_size"`
	Total      int64 `json:"total"`
	TotalPages int64 `json:"total_pages"`
}
