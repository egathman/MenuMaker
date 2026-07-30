from DataBaseHelper import DataBaseHelper
from InterfaceDefinitions import Recipe, CookBook, Menu
import random

class MenuManager:    

    def __init__(self):
        self.dataHelper = DataBaseHelper()
        pass

    def RetrieveMenu(self) -> str:
        recipeList = self.dataHelper.RetrieveAllRecipes()
        strRecipes = random.sample(recipeList, k=7)
        if len(strRecipes) == 7:
            mon = Recipe.Recipe()
            id, recipe = strRecipes[0]
            mon.fromJSON(recipe)

            tues = Recipe.Recipe()
            id, recipe = strRecipes[1]
            tues.fromJSON(recipe)

            wed = Recipe.Recipe()
            id, recipe = strRecipes[2]
            wed.fromJSON(recipe)

            thur = Recipe.Recipe()
            id, recipe = strRecipes[3]
            thur.fromJSON(recipe)

            fri = Recipe.Recipe()
            id, recipe = strRecipes[4]
            fri.fromJSON(recipe)

            sat = Recipe.Recipe()
            id, recipe = strRecipes[5]
            sat.fromJSON(recipe)

            sun = Recipe.Recipe()
            id, recipe = strRecipes[6]
            sun.fromJSON(recipe)

            theMenu = Menu.Menu(mon, tues, wed, thur, fri, sat, sun)
            return theMenu.toJSON()
        return ""

    def RetrieveAllRecipes(self) -> str:
        recipeList = self.dataHelper.RetrieveAllRecipes()
        cb = CookBook.CookBook()
        for r in recipeList:
            id, recipe = r
            r = Recipe.Recipe()
            r.fromJSON(recipe)
            cb.addRecipe(id, r)
        return cb.toJSON()
    
    def EditRecipe(self, id, newRecipe) -> bool:
        recipe = Recipe.Recipe()
        if recipe.fromJSON(newRecipe):
            if self.dataHelper.UpdateRecipeAtID(id, recipe.toJSON()):
                return True
        return False

    def SaveNewRecipe(self, newRecipe) -> bool:
        recipe = Recipe.Recipe()
        if recipe.fromJSON(newRecipe):
            self.dataHelper.SaveNewRecipe(recipe.toJSON())
            return True
        
        return False
        