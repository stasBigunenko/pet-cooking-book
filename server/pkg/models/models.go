package models

import (
	"github.com/google/uuid"
)

type User struct {
	Id       uuid.UUID `json:"id"`
	Name     string    `json:"name"`
	Password string    `json:"password"`
	Email    string    `json:"email"`
}

type Recipe struct {
	Id          uuid.UUID `json:"id"`
	OrderNum    int       `json:"orderNum"`
	Title       string    `json:"title"`
	CookingTime int       `json:"cookingTime"`
	Calories    int       `json:"calories"`
	Description string    `json:"description"`
	Url         string    `json:"url"`
	Likes       int       `json:"likes"`
	Recipe      string    `json:"recipe"`
	Photos      []string  `json:"photos"`
	//Comments     []Comments  `json:"comments"`
}

type Comments struct {
	Id       uuid.UUID `json:"id"`
	RecipeID uuid.UUID `json:"recipeID"`
	Author   string    `json:"author"`
	Comment  string    `json:"comment"`
}
