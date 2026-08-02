from DataBaseHelper import DataBaseHelper
from InterfaceDefinitions import Recipe, CookBook, Menu
import random

class MenuManager:    

    def __init__(self):
        self.dataHelper = DataBaseHelper()
        pass

    def RetrieveMenu(self, year: int, week: int) -> str:
        if year is None:
            return ""
        if week is None:
            return ""
        try:
            if (int(year) > 2100 or int(year) < 2026):
                return ""
            if (int(week) < 0 or int(week) > 55):
                return ""
        except:
            return ""

        dateKey = "y:" + year + "w:" + week
        theMenu = ""
        theMenu = self.dataHelper.RetrieveMenu(dateKey)
        if (theMenu == ""):
            theMenu = self.GenerateMenu()
            if (theMenu != ""):
                self.dataHelper.AddMenu(dateKey, theMenu)
        
        return theMenu

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

    def DeleteRecipe(self, id) -> bool:
        return self.dataHelper.DeleteRecipe(id)

    def GenerateMenu(self) -> str:
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

            return Menu.Menu(mon, tues, wed, thur, fri, sat, sun).toJSON()
        return ""
        