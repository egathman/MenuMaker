from flask import Response
from .InterfaceObject import InterfaceObjectClass
import json

class Recipe(InterfaceObjectClass):

    def __init__(self):
        super().__init__()
        self.RecipeName = ""
        self.Ingrediants = []
        pass
    
    def to_dict(self):
        return {
            "RecipeName" : self.RecipeName, "Ingrediants" : self.Ingrediants
        }


    def toJSON(self) -> str:        
        return json.dumps(self.to_dict())

    def fromJSON(self, text) -> bool:
        data = json.loads(text)
        if "RecipeName" in data:
            self.RecipeName = data["RecipeName"]
        else:
            return False
        
        if "Ingrediants" in data:
            self.Ingrediants = data["Ingrediants"]
        else:
            return False
        
        return True