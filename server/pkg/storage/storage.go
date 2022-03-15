package storage

import (
	"github.com/google/uuid"
	"js/pet-cooking-book/server/pkg/models"
)

type Storage interface {
	GetAllRecipes() ([]models.Recipe, error)
	Create(models.Recipe) (models.Recipe, error)
	Delete(uuid.UUID) error
	Update(models.Recipe) (models.Recipe, error)
	Get(uuid.UUID) (models.Recipe, error)
	UpdateLikes(id uuid.UUID, likes int) error
	SwapRecipes(id1, id2 uuid.UUID, orderNum1, orderNum2 int) error

	GetAllComments(string) ([]models.Comments, error)
	CreateComment(models.Comments) (models.Comments, error)

	CreateUser(u models.User) (models.User, error)
	GetAllUsers() ([]models.User, error)
}
