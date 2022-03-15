CREATE TABLE recipes
(
    id          VARCHAR(40)  NOT NULL,
    orderNum    INT          NOT NULL,
    title       VARCHAR(50)  NOT NULL,
    cookingTime INT          NOT NULL,
    calories    INT          NOT NULL,
    description TEXT         NOT NULL,
    url         VARCHAR(100) NOT NULL,
    likes       INT,
    recipe      TEXT         NOT NULL,
    photos      json
);

CREATE TABLE users
(
    id       VARCHAR(40)  NOT NULL,
    name     VARCHAR(50)  NOT NULL,
    password VARCHAR(100) NOT NULL,
    email    VARCHAR(50)  NOT NULL
);

CREATE TABLE comments
(
    id       VARCHAR(40) NOT NULL,
    recipeID VARCHAR(40) NOT NULL,
    author   VARCHAR(50) NOT NULL,
    comment  TEXT        NOT NULL
);