class point:
    def __init__(self):
        self.x = 10
        self.y = 12 
        
    def modify(self, x, y):
        self.x = x
        self.y = y 

    def display(self):
        print(self.x)
        print(self.y)

p = point()
p.display()
p.modify(100,345)
p.display()