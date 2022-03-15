package storage

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/google/uuid"
	_ "github.com/lib/pq"
	"js/pet-cooking-book/server/pkg/models"
	"sort"
	"sync"
)

type PostgresDB struct {
	Pdb *sql.DB
	mu  sync.Mutex
}

func NewPDB(host string, port string, user string, psw string, dbname string, ssl string) (*PostgresDB, error) {
	connStr := "host=" + host + " port=" + port + " user=" + user + " password=" + psw + " dbname=" + dbname + " sslmode=" + ssl

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to connect database %w\n", err)
	}

	database := &PostgresDB{Pdb: db}

	return database, nil
}

func (pdb *PostgresDB) GetAllRecipes() ([]models.Recipe, error) {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()

	rows, err := pdb.Pdb.Query(
		`SELECT * FROM recipes`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var recipes []models.Recipe

	for rows.Next() {
		r := models.Recipe{}
		var rId string
		var photosJson []byte

		err := rows.Scan(
			&rId,
			&r.OrderNum,
			&r.Title,
			&r.CookingTime,
			&r.Calories,
			&r.Description,
			&r.Url,
			&r.Likes,
			&r.Recipe,
			&photosJson,
		)
		if err != nil {
			return nil, err
		}
		r.Id, err = uuid.Parse(rId)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(photosJson, &r.Photos)

		recipes = append(recipes, r)
	}

	sort.Slice(recipes, func(i, j int) bool {
		return recipes[i].OrderNum < recipes[j].OrderNum
	})

	return recipes, nil
}

func (pdb *PostgresDB) Create(r models.Recipe) (models.Recipe, error) {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()
	id := uuid.New()
	idStr := id.String()

	photosJson, _ := json.Marshal(r.Photos)

	_, err := pdb.Pdb.Exec(
		`INSERT INTO recipes (
            id, 
            orderNum,
			title,
			cookingTime,
			calories,
			description,
			url,
			likes,
			recipe,
        	photos
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
		idStr,
		r.OrderNum,
		r.Title,
		r.CookingTime,
		r.Calories,
		r.Description,
		r.Url,
		r.Likes,
		r.Recipe,
		photosJson,
	)
	if err != nil {
		return models.Recipe{}, errors.New("couldn't create recipe in database")
	}

	r.Id = id

	return r, nil
}

func (pdb *PostgresDB) Delete(id uuid.UUID) error {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()

	idStr := id.String()

	_, err := pdb.Pdb.Exec(
		`DELETE FROM recipes where id = $1`, idStr)
	if err != nil {
		return errors.New("couldn't delete post")
	}

	return nil
}

func (pdb *PostgresDB) Get(id uuid.UUID) (models.Recipe, error) {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()

	idStr := id.String()

	var r models.Recipe
	var photosJson []byte

	err := pdb.Pdb.QueryRow(
		`SELECT 
       		orderNum,
			title,
			cookingTime,
			calories,
			description,
			url,
			likes,
			recipe,
       		photos
		FROM recipes 
			WHERE id=$1`, idStr).Scan(
		&r.OrderNum,
		&r.Title,
		&r.CookingTime,
		&r.Calories,
		&r.Description,
		&r.Url,
		&r.Likes,
		&r.Recipe,
		&photosJson,
	)
	if err != nil {
		return models.Recipe{}, errors.New("couldn't find recipe in database")
	}

	json.Unmarshal(photosJson, &r.Photos)

	r.Id = id

	return r, nil
}

func (pdb *PostgresDB) Update(r models.Recipe) (models.Recipe, error) {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()

	idStr := r.Id.String()
	photosJson, _ := json.Marshal(r.Photos)

	_, err := pdb.Pdb.Exec(
		`UPDATE recipes SET 
                   	orderNum=$1,
					title=$2,
					cookingTime=$3,
					calories=$4,
					description=$5,
					url=$6,
					likes=$7,
					recipe=$8,
                   	photos=$9
				WHERE id=$10`,
		r.OrderNum,
		r.Title,
		r.CookingTime,
		r.Calories,
		r.Description,
		r.Url,
		r.Likes,
		r.Recipe,
		photosJson,
		idStr)
	if err != nil {
		return models.Recipe{}, errors.New("couldn't update post")
	}

	return r, nil
}

func (pdb *PostgresDB) UpdateLikes(id uuid.UUID, likes int) error {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()

	idStr := id.String()

	_, err := pdb.Pdb.Exec(
		`UPDATE recipes SET 
                   	likes=$1
				WHERE id=$2`,
		likes,
		idStr)
	if err != nil {
		return errors.New("couldn't update likes")
	}

	return nil
}

func (pdb *PostgresDB) CreateUser(u models.User) (models.User, error) {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()
	id := uuid.New()
	idStr := id.String()

	_, err := pdb.Pdb.Exec(
		`INSERT INTO users (
            id, 
            name,
			password,
			email
            ) VALUES ($1, $2, $3, $4)`,
		idStr,
		u.Name,
		u.Password,
		u.Email,
	)
	if err != nil {
		return models.User{}, errors.New("couldn't create recipe in database")
	}

	u.Id = id

	return u, nil
}

func (pdb *PostgresDB) GetAllUsers() ([]models.User, error) {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()

	rows, err := pdb.Pdb.Query(
		`SELECT * FROM users`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User

	for rows.Next() {
		u := models.User{}
		var uId string

		err := rows.Scan(
			&uId,
			&u.Name,
			&u.Password,
			&u.Email,
		)
		if err != nil {
			return nil, err
		}
		u.Id, err = uuid.Parse(uId)
		if err != nil {
			return nil, err
		}

		users = append(users, u)
	}

	return users, nil
}

func (pdb *PostgresDB) SwapRecipes(id1, id2 uuid.UUID, orderNum1, orderNum2 int) error {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()

	idStr1 := id1.String()
	idStr2 := id2.String()

	_, err := pdb.Pdb.Exec(
		`UPDATE recipes SET 
                   	orderNum=$1
				WHERE id=$2`,
		orderNum2,
		idStr1)
	if err != nil {
		return errors.New("couldn't change order")
	}

	_, err = pdb.Pdb.Exec(
		`UPDATE recipes SET 
                   	orderNum=$1
				WHERE id=$2`,
		orderNum1,
		idStr2)
	if err != nil {
		return errors.New("couldn't change order")
	}

	return nil
}

func (pdb *PostgresDB) GetAllComments(id string) ([]models.Comments, error) {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()

	rows, err := pdb.Pdb.Query(
		`SELECT * FROM comments WHERE recipeID=$1`, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []models.Comments

	for rows.Next() {
		c := models.Comments{}
		var cId, cRID string

		err := rows.Scan(
			&cId,
			&cRID,
			&c.Author,
			&c.Comment,
		)
		if err != nil {
			return nil, err
		}
		c.Id, err = uuid.Parse(cId)
		if err != nil {
			return nil, err
		}
		c.RecipeID, err = uuid.Parse(cRID)
		if err != nil {
			return nil, err
		}

		comments = append(comments, c)
	}

	return comments, nil
}

func (pdb *PostgresDB) CreateComment(c models.Comments) (models.Comments, error) {
	pdb.mu.Lock()
	defer pdb.mu.Unlock()
	id := uuid.New()
	idStr := id.String()

	cRID := c.RecipeID.String()

	_, err := pdb.Pdb.Exec(
		`INSERT INTO comments (
            id, 
            recipeID,
			author,
			comment
            ) VALUES ($1, $2, $3, $4)`,
		idStr,
		cRID,
		c.Author,
		c.Comment,
	)
	if err != nil {
		return models.Comments{}, errors.New("couldn't create recipe in database")
	}

	c.Id = id

	return c, nil
}
