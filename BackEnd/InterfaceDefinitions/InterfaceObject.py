from abc import ABC, abstractmethod
from flask import Response

class InterfaceObjectClass(ABC):
    def __init__ (self):
        pass

    @abstractmethod
    def toJSON(self) -> str:
        pass

    @abstractmethod
    def fromJSON(self, text) -> bool:
        pass