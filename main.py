def greet(name):
    """A helper function to demonstrate calling logic."""
    return f"Hello, {name}!"

def main():
    """The main entry point of the script."""
    print("Initializing the program...")
    
    # Executing the core logic
    message = greet("Developer")
    print(message)

# The boilerplate guard that safely triggers execution
if __name__ == "__main__":
    main()