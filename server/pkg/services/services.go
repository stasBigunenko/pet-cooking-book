package services

import (
	"errors"
	"github.com/google/uuid"
	"js/pet-cooking-book/server/pkg/models"
	"js/pet-cooking-book/server/pkg/storage"
)

type Services struct {
	store storage.Storage
}

func NewServices(s storage.Storage) Services {
	return Services{
		store: s,
	}
}

func (s *Services) GetAll() ([]models.Recipe, error) {

	recipes, err := s.store.GetAllRecipes()
	if err != nil {
		return nil, err
	}

	return recipes, nil
}

func (s *Services) Create(r models.Recipe) (models.Recipe, error) {
	recipeNew, err := s.store.Create(r)
	if err != nil {
		return models.Recipe{}, err
	}

	return recipeNew, nil
}

func (s *Services) Get(idStr string) (models.Recipe, error) {

	id, err := uuid.Parse(idStr)
	if err != nil {
		return models.Recipe{}, errors.New("wrong recipe id")
	}

	r, err := s.store.Get(id)
	if err != nil {
		return models.Recipe{}, err
	}

	return r, nil
}

func (s *Services) Delete(idStr string) error {

	id, err := uuid.Parse(idStr)
	if err != nil {
		return errors.New("wrong recipe id")
	}

	err = s.store.Delete(id)
	if err != nil {
		return err
	}

	return nil
}

func (s *Services) Update(r models.Recipe) (models.Recipe, error) {

	updatedRecipe, err := s.store.Update(r)
	if err != nil {
		return models.Recipe{}, err
	}

	return updatedRecipe, nil
}

func (s *Services) UpdateLikes(id uuid.UUID, likes int) error {
	err := s.store.UpdateLikes(id, likes)
	if err != nil {
		return err
	}

	return nil
}

func (s *Services) CreateUser(u models.User) (models.User, error) {
	newUser, err := s.store.CreateUser(u)
	if err != nil {
		return models.User{}, err
	}

	return newUser, nil
}

func (s *Services) GetAllUsers() ([]models.User, error) {

	u, err := s.store.GetAllUsers()
	if err != nil {
		return []models.User{}, err
	}

	return u, nil
}

func (s *Services) SwapRecipes(id1, id2 uuid.UUID, orderNum1, orderNum2 int) error {
	err := s.store.SwapRecipes(id1, id2, orderNum1, orderNum2)
	if err != nil {
		return err
	}

	return nil
}

func (s *Services) GetAllComments(id string) ([]models.Comments, error) {
	comments, err := s.store.GetAllComments(id)
	if err != nil {
		return nil, err
	}

	return comments, nil
}

func (s *Services) CreateComment(c models.Comments) (models.Comments, error) {
	commentNew, err := s.store.CreateComment(c)
	if err != nil {
		return models.Comments{}, err
	}

	return commentNew, nil
}
