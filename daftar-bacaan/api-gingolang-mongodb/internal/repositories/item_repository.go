package repositories

import (
	"api-gingolang-mongodb/internal/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ItemRepository struct {
	collection *mongo.Collection
}

func NewItemRepository(db *mongo.Database) *ItemRepository {
	return &ItemRepository{
		collection: db.Collection("items"),
	}
}

func (r *ItemRepository) CreateMultipleItems(ctx context.Context, items []models.Item) (*mongo.InsertManyResult, error) {
	docs := make([]interface{}, len(items))
	for i, item := range items {
		docs[i] = item
	}

	result, err := r.collection.InsertMany(ctx, docs)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *ItemRepository) GetAllItems(ctx context.Context) ([]models.Item, error) {
	var Items []models.Item
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	if err = cursor.All(ctx, &Items); err != nil {
		return nil, err
	}
	return Items, nil
}

func (r *ItemRepository) GetItemByID(ctx context.Context, id primitive.ObjectID) (*models.Item, error) {
	var item models.Item
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&item)
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *ItemRepository) UpdateItem(ctx context.Context, id primitive.ObjectID, item *models.Item) (*mongo.UpdateResult, error) {
	update := bson.M{"$set": item}
	result, err := r.collection.UpdateOne(ctx, bson.M{"_id": id}, update)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *ItemRepository) DeleteItem(ctx context.Context, id primitive.ObjectID) (*mongo.DeleteResult, error) {
	result, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		return nil, err
	}
	return result, nil
}
