package services

import (
	"github.com/google/uuid"
	"js/pet-cooking-book/server/pkg/models"
)

type ServicesInt interface {
	GetAll() ([]models.Recipe, error)
	Create(models.Recipe) (models.Recipe, error)
	Delete(string) error
	Update(models.Recipe) (models.Recipe, error)
	Get(string) (models.Recipe, error)
	UpdateLikes(id uuid.UUID, likes int) error
	SwapRecipes(id1, id2 uuid.UUID, orderNum1, orderNum2 int) error

	GetAllComments(string) ([]models.Comments, error)
	CreateComment(models.Comments) (models.Comments, error)

	CreateUser(u models.User) (models.User, error)
	GetAllUsers() ([]models.User, error)
}
