from .InterfaceObject import InterfaceObjectClass
from .Recipe import Recipe
import json

class IndexedRecipe:
    def __init__(self, idx, recipe):
        self.index = idx
        self.Recipe: Recipe = recipe

    def to_dict(self):
        return {
            "ID" : self.index, "recipe" : self.Recipe.to_dict()
        }

class CookBook(InterfaceObjectClass):
    def __init__(self):
        self.Recipes = []

    def addRecipe(self, id, recipe: Recipe):
        indexedRecipe = IndexedRecipe(id, recipe)
        self.Recipes.append(indexedRecipe.to_dict())
        return

    def toJSON(self) -> str:
        cookBookDict = { "Recipes" : self.Recipes}
        return json.dumps(cookBookDict)

    def fromJSON(self, text) -> bool:
        return