from .InterfaceObject import InterfaceObjectClass
from .Recipe import Recipe
import json

class Menu(InterfaceObjectClass):

    def __init__(self, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday):
        self.Monday: Recipe = Monday
        self.Tuesday: Recipe = Tuesday
        self.Wednesday: Recipe = Wednesday
        self.Thursday: Recipe = Thursday
        self.Friday: Recipe = Friday
        self.Saturday: Recipe = Saturday
        self.Sunday: Recipe = Sunday

    def to_dict(self):
        return {
            "Monday" : self.Monday.to_dict(),
            "Tuesday" : self.Tuesday.to_dict(),
            "Wednesday" : self.Wednesday.to_dict(),
            "Thursday" : self.Thursday.to_dict(),
            "Friday" : self.Friday.to_dict(),
            "Saturday" : self.Saturday.to_dict(),
            "Sunday" : self.Sunday.to_dict()
        }

    def toJSON(self) -> str:        
        return json.dumps(self.to_dict())

    def fromJSON(self, text) -> bool:
        pass
