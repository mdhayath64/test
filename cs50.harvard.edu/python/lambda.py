people = [
    {"name":"harry", "house" : "Gryffindor"},
    {"name":"cho", "house" : "Ravenclow"},
    {"name":"Draco", "house" : "Slytherin"}
]

def fun(people):
    return people["name"]


people.sort(key = lambda people : people["name"])

print(people)