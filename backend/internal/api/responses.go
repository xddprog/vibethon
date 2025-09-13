package api

// ErrorResponse представляет структуру ответа об ошибке

// SuccessResponse представляет структуру успешного ответа
type SuccessResponse struct {
	Message string `json:"message" example:"операция выполнена успешно"`
}

// ListResponse представляет структуру ответа со списком
type ListResponse struct {
	Data  interface{} `json:"data"`
	Total int         `json:"total" example:"100"`
	Page  int         `json:"page" example:"1"`
	Limit int         `json:"limit" example:"10"`
}
