package handlers

import (
	"encoding/json"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"js/pet-cooking-book/server/pkg/models"
	"js/pet-cooking-book/server/pkg/services"
	"net/http"
)

type Handler struct {
	services services.ServicesInt
}

func NewHandler(s services.ServicesInt) *Handler {
	return &Handler{
		services: s,
	}
}

func (h *Handler) Routes(r *mux.Router) *mux.Router {
	r.HandleFunc("/create/recipe", h.Create).Methods("POST", "OPTIONS")
	r.HandleFunc("/recipes/delete/{id}", h.Delete).Methods("DELETE", "OPTIONS")
	r.HandleFunc("/recipes/update/{id}", h.UpdateRecipe).Methods("PUT", "OPTIONS")
	r.HandleFunc("/recipes/likes/{id}", h.UpdateLikes).Methods("PUT", "OPTIONS")
	r.HandleFunc("/recipes/{id}", h.GetRecipeById).Methods("GET", "OPTIONS")
	r.HandleFunc("/recipes/swap", h.SwapRecipes).Methods("PUT", "OPTIONS")
	r.HandleFunc("/recipes", h.GetAllRecipes).Methods("GET", "OPTIONS")

	r.HandleFunc("/comments/{id}", h.GetAllComments).Methods("GET", "OPTIONS")
	r.HandleFunc("/create/comment/{id}", h.CreateComment).Methods("POST", "OPTIONS")

	r.HandleFunc("/create/user", h.CreateUser).Methods("POST", "OPTIONS")
	r.HandleFunc("/users", h.GetUsers).Methods("GET", "OPTIONS")
	return r
}

func setupCORS(w *http.ResponseWriter, r *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, PATCH, DELETE")
	(*w).Header().Set("Content-Type", "application/json")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func (h *Handler) GetAllRecipes(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodGet {
		msg := "Method Not Allowed" //TODO
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	res, err := h.services.GetAll()
	if err != nil {
		msg := err
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&res)
	return
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	if r.Method != http.MethodPost {
		msg := "Method Not Allowed" //TODO
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	var rec models.Recipe

	err := json.NewDecoder(r.Body).Decode(&rec)
	if err != nil {
		msg := "Wrong body"
		w.WriteHeader(http.StatusNotAcceptable)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	res, err := h.services.Create(rec)
	if err != nil {
		msg := err
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&res)
	return
}

func (h *Handler) GetRecipeById(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	if r.Method != http.MethodGet {
		msg := "Method Not Allowed"
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	//id, err := strconv.Atoi(r.URL.Query().Get("id"))
	vars := mux.Vars(r)
	key := vars["id"]

	res, err := h.services.Get(key)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(&err)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&res)
	return
}

func (h *Handler) Delete(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	if r.Method != http.MethodDelete {
		msg := "Method Not Allowed" //TODO
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	vars := mux.Vars(r)
	key := vars["id"]

	err := h.services.Delete(key)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(&err)
		return
	}

	msg := "Recipe have been deleted successfully"
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&msg)
	return
}

func (h *Handler) UpdateRecipe(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	if r.Method != http.MethodPut {
		msg := "Method Not Allowed" //TODO
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	var rec models.Recipe

	err := json.NewDecoder(r.Body).Decode(&rec)
	if err != nil {
		msg := "Wrong body" //TODO
		w.WriteHeader(http.StatusNotAcceptable)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	vars := mux.Vars(r)
	key := vars["id"]

	rec.Id, err = uuid.Parse(key)
	if err != nil {
		msg := "Couldn't parse id/wrong id"
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	res, err := h.services.Update(rec)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(&err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&res)
	return
}

func (h *Handler) UpdateLikes(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	if r.Method != http.MethodPut {
		msg := "Method Not Allowed" //TODO
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	var likes struct {
		Id    uuid.UUID `json:"id"`
		Likes int       `json:"likes"`
	}

	err := json.NewDecoder(r.Body).Decode(&likes)
	if err != nil {
		msg := "Wrong body" //TODO
		w.WriteHeader(http.StatusNotAcceptable)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	vars := mux.Vars(r)
	key := vars["id"]

	likes.Id, err = uuid.Parse(key)
	if err != nil {
		msg := "Couldn't parse id/wrong id"
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	err = h.services.UpdateLikes(likes.Id, likes.Likes)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(&err)
		return
	}

	w.WriteHeader(http.StatusOK)
	return
}

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	if r.Method != http.MethodPost {
		msg := "Method Not Allowed" //TODO
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	var user models.User

	json.NewDecoder(r.Body).Decode(&user)

	res, err := h.services.CreateUser(user)
	if err != nil {
		msg := err
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&res)
	return
}

func (h *Handler) GetUsers(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	if r.Method != http.MethodGet {
		msg := "Method Not Allowed"
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	res, err := h.services.GetAllUsers()
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(&err)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&res)
	return
}

func (h *Handler) SwapRecipes(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	if r.Method != http.MethodPut {
		msg := "Method Not Allowed" //TODO
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}
	var swap struct {
		Id1       uuid.UUID `json:"id1"`
		Id2       uuid.UUID `json:"id2"`
		OrderNum1 int       `json:"orderNum1"`
		OrderNum2 int       `json:"orderNum2"`
	}

	err := json.NewDecoder(r.Body).Decode(&swap)
	if err != nil {
		msg := "Wrong body" //TODO
		w.WriteHeader(http.StatusNotAcceptable)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	err = h.services.SwapRecipes(swap.Id1, swap.Id2, swap.OrderNum1, swap.OrderNum2)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(&err)
		return
	}

	w.WriteHeader(http.StatusOK)
	return
}

func (h *Handler) GetAllComments(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodGet {
		msg := "Method Not Allowed" //TODO
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	vars := mux.Vars(r)
	key := vars["id"]

	res, err := h.services.GetAllComments(key)
	if err != nil {
		msg := err
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&res)
	return
}

func (h *Handler) CreateComment(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}
	if r.Method != http.MethodPost {
		msg := "Method Not Allowed" //TODO
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	var comm models.Comments

	err := json.NewDecoder(r.Body).Decode(&comm)
	if err != nil {
		msg := "Wrong body"
		w.WriteHeader(http.StatusNotAcceptable)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	res, err := h.services.CreateComment(comm)
	if err != nil {
		msg := err
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(&msg)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&res)
	return
}
