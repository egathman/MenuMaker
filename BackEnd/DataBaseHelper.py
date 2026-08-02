import sqlite3
from typing import List

class DataBaseHelper:
    def __init__(self):
        self.conn = sqlite3.connect("SavedData.db")
        cursor = self.conn.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS menu (date TEXT PRIMARY KEY, menu TEXT)")
        cursor.execute("CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, recipe TEXT)")
        self.conn.commit()
        self.conn.close()
        pass

    def UpdateRecipeAtID(self, id, recipe) -> bool:
        success = False
        self.conn = sqlite3.connect("SavedData.db")      
        cursor = self.conn.cursor()
        sql_update_query = """
            UPDATE recipes 
            SET recipe = ?
            WHERE id = ?
        """
        try:            
            cursor.execute(sql_update_query, (recipe, id))
            self.conn.commit()
            success = True
            print(f"Successfully updated. Rows affected: {cursor.rowcount}")
        except sqlite3.Error as error:
            # Roll back changes if an error occurs
            self.conn.rollback()
            print(f"Failed to update table: {error}")
        finally:
            # 6. Always close the connection when finished
            cursor.close()
            self.conn.close()
        return success

    def RetrieveAllRecipes(self) -> List[any]:
        self.conn = sqlite3.connect("SavedData.db")      
        cursor = self.conn.cursor()
        cursor.execute("SELECT id, recipe FROM recipes")
        rows = cursor.fetchall()
        self.conn.close()
        return rows
    
    def SaveNewRecipe(self, recipe):
        self.conn = sqlite3.connect("SavedData.db")      
        cursor = self.conn.cursor()
        cursor.execute("INSERT INTO recipes (recipe) VALUES ('" + recipe + "');")
        self.conn.commit()
        self.conn.close()
        return

    def DeleteRecipe(self, id):
        success = False
        self.conn = sqlite3.connect("SavedData.db")      
        cursor = self.conn.cursor()
        sql_update_query = """
            DELETE FROM recipes 
            WHERE id = ?
        """
        try:            
            cursor.execute(sql_update_query, (id,))
            self.conn.commit()
            success = True
            print(f"Successfully updated. Rows affected: {cursor.rowcount}")
        except sqlite3.Error as error:
            # Roll back changes if an error occurs
            self.conn.rollback()
            print(f"Failed to update table: {error}")
        finally:
            # 6. Always close the connection when finished
            cursor.close()
            self.conn.close()
        return success
    
        