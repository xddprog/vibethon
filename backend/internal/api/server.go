package api

import (
	"backend/internal/business"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	router      *gin.Engine
	userHandler *UserHandler
}

func NewServer(userService business.UserService) *Server {
	server := &Server{
		router:      gin.Default(),
		userHandler: NewUserHandler(userService),
	}

	server.setupRoutes()
	return server
}

func (s *Server) setupRoutes() {
	// Добавляем middleware для CORS и логирования до определения маршрутов
	s.router.Use(CORSMiddleware())
	s.router.Use(gin.Logger())
	s.router.Use(gin.Recovery())

	// Swagger документация
	s.router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Основные API маршруты
	api := s.router.Group("/api/v1")
	{
		users := api.Group("/users")
		{
			users.POST("", s.userHandler.CreateUser)
			users.GET("", s.userHandler.ListUsers)
			users.GET("/:id", s.userHandler.GetUser)
			// users.PUT("/:id", s.userHandler.UpdateUser)
			// users.DELETE("/:id", s.userHandler.DeleteUser)
		}

		coworking := api.Group("/coworking")
		{
			coworking.GET("/:id", s.userHandler.GetCoworking)
			coworking.PUT("/:id", s.userHandler.UpdateCoworking)
		}
	}
}

func (s *Server) Run(addr string) error {
	return s.router.Run(addr)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
