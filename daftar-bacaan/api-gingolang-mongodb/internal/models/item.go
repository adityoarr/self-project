package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Item struct {
	ID       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Category string             `json:"category" bson:"category,omitempty"`
	Name     string             `json:"name" bson:"name,omitempty"`
	Link     string             `json:"link" bson:"link,omitempty"`
}
