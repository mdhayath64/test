def announce(f):
    def wrapper():
        print("about to run the functions")
        f()
        print("Done with the functions")
    return wrapper

@announce
def hello():
    print("hello world")

hello()